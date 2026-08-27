# Go Backend Guide 🔷

A guide for building high-performance, concurrent, and reliable microservices with idiomatic Go (Golang).

---

## 🎯 Key Architectural Principles

1. **Context Propagation**: Always accept and pass `context.Context` as the first argument in functions performing I/O or network requests.
2. **Explicit Error Handling**: Treat errors as normal values. Wrap errors with context (`fmt.Errorf("fetching user: %w", err)`).
3. **Goroutine Lifecycle Management**: Never start a goroutine without knowing how and when it will terminate. Use `sync.WaitGroup` or `errgroup.Group`.
4. **Structured & Layered Architecture**: Separate handler (transport), service (business logic), and repository (persistence) layers.

---

## 💡 Best Practices

### 1. HTTP Server with Graceful Shutdown
```go
package main

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	mux := http.NewServeMux()

	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok"}`))
	})

	srv := &http.Server{
		Addr:         ":8080",
		Handler:      mux,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	go func() {
		logger.Info("Starting server", "addr", srv.Addr)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			logger.Error("Server error", "err", err)
		}
	}()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)
	<-stop

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		logger.Error("Forced shutdown", "err", err)
	}
	logger.Info("Server exited properly")
}
```

---

## ⚠️ Common Pitfalls to Avoid

- ❌ **Goroutine Leaks**: Launching goroutines that block forever on unbuffered channels or hung HTTP requests without timeouts.
- ❌ **Ignoring `defer r.Body.Close()`**: Failing to drain and close HTTP response bodies leads to socket leaks and connection pool exhaustion.

---

## 🔧 Recommended Ecosystem

- **Routers**: Standard Library `net/http` (Go 1.22+), [Chi](https://github.com/go-chi/chi), [Echo](https://echo.labstack.com/)
- **Database / ORM**: [pgx](https://github.com/jackc/pgx), [sqlc](https://sqlc.dev/), [GORM](https://gorm.io/)
- **Structured Logging**: `log/slog` (Standard Library)
- **Validation**: [go-playground/validator](https://github.com/go-playground/validator)
