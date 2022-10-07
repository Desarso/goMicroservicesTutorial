package main

import (
	"fmt"
	"html/template"
	"net/http"
)

var tpl *template.Template

func main() {
	tpl, _ = tpl.ParseGlob("templates/*.html")
	myDir := http.Dir("./dist")
	fmt.Printf("myDir type: %T", myDir)
	myHandler := http.FileServer(myDir)
	http.Handle("/", myHandler)
	http.ListenAndServe(":80", nil)
}
