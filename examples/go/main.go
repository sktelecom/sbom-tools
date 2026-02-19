package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
)

var log = logrus.New()

var rootCmd = &cobra.Command{
	Use:   "app",
	Short: "Example Go application",
	Run: func(cmd *cobra.Command, args []string) {
		runServer()
	},
}

func runServer() {
	log.Info("Starting Go Example Application")
	
	r := gin.Default()
	
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello from Go Example",
			"version": "1.0.0",
		})
	})
	
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "healthy",
		})
	})
	
	log.Info("Server running on :8080")
	r.Run(":8080")
}

func main() {
	log.SetFormatter(&logrus.JSONFormatter{})
	
	if err := rootCmd.Execute(); err != nil {
		log.Fatal(err)
	}
}
