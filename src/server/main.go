package main

import (
	"context"
	"net"
	"os"
	"strconv"

	"github.com/OpenCircuits/OpenCircuits/site/go/api"
	"github.com/OpenCircuits/OpenCircuits/site/go/auth"
	"github.com/OpenCircuits/OpenCircuits/site/go/auth/github"
	"github.com/OpenCircuits/OpenCircuits/site/go/auth/google"
	"github.com/OpenCircuits/OpenCircuits/site/go/auth/meta"
	"github.com/OpenCircuits/OpenCircuits/site/go/core"
	"github.com/OpenCircuits/OpenCircuits/site/go/core/interfaces"
	"github.com/OpenCircuits/OpenCircuits/site/go/core/utils"
	"github.com/OpenCircuits/OpenCircuits/site/go/storage"
	"github.com/OpenCircuits/OpenCircuits/site/go/storage/gcp_datastore"
	"github.com/OpenCircuits/OpenCircuits/site/go/storage/sqlite"
	"github.com/OpenCircuits/OpenCircuits/site/go/web"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
)

func getPort() string {
	for port := 8080; port <= 65535; port++ {
		ln, err := net.Listen("tcp", ":"+strconv.Itoa(port))
		if err == nil {
			ln.Close()
			return strconv.Itoa(port)
		}
	}
	return "8080"
}

// Check if env variable exists, if not set to default value, return value of env variable
func checkEnv(key string, defaultVal string) string {
	if os.Getenv(key) == "" {
		err := os.Setenv(key, defaultVal)
		if err != nil {
			return err.Error()
		}
	}
	return os.Getenv(key)
}

func main() {
	var err error

	// Unsure how to store help messages in env variables, for now they are commented

	// <path-to-config>; Enables google, github, meta sign-in API login
	googleAuthConfig := checkEnv("google_auth", "")
	githubAuthConfig := checkEnv("github_auth", "")
	metaAuthConfig := checkEnv("meta_auth", "")

	noAuthConfig := checkEnv("no_auth", "true")              // Enables username-only authentication for testing and development
	userCsifConfig := checkEnv("interface", "sqlite")        // The storage interface
	sqlitePathConfig := checkEnv("sqlitePath", "sql/sqlite") // The path to the sqlite working directory
	dsEmulatorHost := checkEnv("ds_emu_host", "")            // The emulator host address for cloud datastore
	dsProjectId := checkEnv("ds_emu_project_id", "")         // The gcp project id for the datastore emulator
	ipAddressConfig := checkEnv("ip_address", "0.0.0.0")     // IP address of server
	portConfig := checkEnv("port", "8080")                   // Port to serve application, use \"auto\" to select the first available port starting at 8080

	// Register authentication method
	authManager := auth.AuthenticationManager{}
	if googleAuthConfig != "" {
		authManager.RegisterAuthenticationMethod(google.New(googleAuthConfig))
	}
	if githubAuthConfig != "" {
		authManager.RegisterAuthenticationMethod(github.New(githubAuthConfig))
	}
	if metaAuthConfig != "" {
		authManager.RegisterAuthenticationMethod(meta.New(metaAuthConfig))
	}
	// Figure out a better way to do this (Convert to bool or decide on different indicator)
	if noAuthConfig == "true" {
		authManager.RegisterAuthenticationMethod(auth.NewNoAuth())
	}

	// Set up the storage interface
	var userCsif interfaces.CircuitStorageInterfaceFactory
	if userCsifConfig == "mem" {
		userCsif = storage.NewMemStorageInterfaceFactory()
	} else if userCsifConfig == "sqlite" {
		userCsif, err = sqlite.NewInterfaceFactory(sqlitePathConfig)
		core.CheckErrorMessage(err, "Failed to load sqlite instance:")
	} else if userCsifConfig == "gcp_datastore_emu" {
		userCsif, err = gcp_datastore.NewEmuInterfaceFactory(context.Background(), dsProjectId, dsEmulatorHost)
		core.CheckErrorMessage(err, "Failed to load gcp datastore emulator instance:")
	} else if userCsifConfig == "gcp_datastore" {
		userCsif, err = gcp_datastore.NewInterfaceFactory(context.Background())
		core.CheckErrorMessage(err, "Failed to load gcp datastore instance: ")
	}

	// Route through Gin
	router := gin.Default()
	router.Use(gin.Recovery())

	// Generate CSRF Token...
	store := sessions.NewCookieStore([]byte(utils.RandToken(64)))
	store.Options(sessions.Options{
		Path:   "/",
		MaxAge: 60 * 60 * 24 * 7,
	})
	router.Use(sessions.Sessions("opencircuitssession", store))

	// Register pages
	web.RegisterPages(router, authManager)
	authManager.RegisterHandlers(router)
	api.RegisterRoutes(router, authManager, userCsif)

	// Check if portConfig is set to auto, if so find available port
	if portConfig == "auto" {
		os.Setenv("port", getPort())
	}

	router.Run(ipAddressConfig + ":" + portConfig)
}
