use actix_web::{get, web, App, HttpServer, Responder};
use serde::Serialize;

#[derive(Serialize)]
struct Response {
    message: String,
    version: String,
}

#[get("/")]
async fn hello() -> impl Responder {
    web::Json(Response {
        message: "Hello from Rust Example".to_string(),
        version: "1.0.0".to_string(),
    })
}

#[get("/health")]
async fn health() -> impl Responder {
    web::Json(Response {
        message: "healthy".to_string(),
        version: "1.0.0".to_string(),
    })
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Rust Actix-web Example starting on :8080");
    
    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(health)
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
