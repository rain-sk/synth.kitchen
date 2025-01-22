mod users;

// #[derive(Serialize)]
// struct HelloResponse {
//     ok: i32,
// }

#[tokio::main]
async fn main() {
    // let routes_hello = Router::new().route(
    //     "/hello",
    //     get(|| async {
    //         let response = HelloResponse { ok: 42 };
    //         Json(response)
    //     }),
    // );

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8000").await.unwrap();
    axum::serve(listener, users::routes::routes().into_make_service())
        .await
        .unwrap();
}
