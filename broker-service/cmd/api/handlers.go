package main

import (
	"net/http"
)

func (app *Config) Broker(writer http.ResponseWriter, request *http.Request) {
	payload := jsonResponse{
		Error:   false,
		Message: "Hit the broker",
	}

	_ = app.writeJSON(writer, http.StatusOK, payload)

}
