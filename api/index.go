package handler

import (
	"embed"
	"fmt"
	"io"
	"net/http"
	"strings"
)

//go:embed templates/*
var templatesFS embed.FS

func Handler(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	// Normalize path by removing trailing slash
	path = strings.TrimSuffix(path, "/")
	if path == "" {
		path = "/"
	}

	switch path {
	case "/":
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		serveTemplate(w, "templates/index.html")
	case "/deleteaccount", "/settings/remove":
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		serveTemplate(w, "templates/deleteaccount.html")
	case "/privacy", "/privacy-policy":
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		serveTemplate(w, "templates/privacy.html")
	case "/terms", "/terms-of-use":
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		serveTemplate(w, "templates/terms.html")
	case "/refund-policy":
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		serveTemplate(w, "templates/refund.html")
	case "/about":
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		serveTemplate(w, "templates/about.html")
	case "/contact":
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		serveTemplate(w, "templates/contact.html")
	case "/platform":
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		serveTemplate(w, "templates/platform.html")
	case "/api/removeaccount":
		handleRemoveAccount(w, r)
	default:
		w.WriteHeader(http.StatusNotFound)
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		serveTemplate(w, "templates/404.html")
	}
}

func serveTemplate(w http.ResponseWriter, filename string) {
	data, err := templatesFS.ReadFile(filename)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error reading template: %v", err)
		return
	}
	w.Write(data)
}

func handleRemoveAccount(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"success":false,"message":"Failed to read request body"}`))
		return
	}

	// Create request to upstream Azure delete account endpoint
	req, err := http.NewRequest(http.MethodPost, "https://bareeyapiendpoint.azurewebsites.net/removeaccount/", strings.NewReader(string(body)))
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"success":false,"message":"Failed to prepare upstream request"}`))
		return
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadGateway)
		w.Write([]byte(`{"success":false,"message":"Failed to contact verification server"}`))
		return
	}
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(resp.Body)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(resp.StatusCode)
	w.Write(respBody)
}
