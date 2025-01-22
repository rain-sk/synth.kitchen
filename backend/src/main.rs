use axum::{response::Html, routing::get, Router};



#[tokio::main]
async fn main() {
    let routes_hello = Router::new().route("/hello", get(||async{
        Html("Hello <strong>World!!!</strong>")
    }));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8000").await.unwrap();
    axum::serve(listener, routes_hello).await.unwrap();
}