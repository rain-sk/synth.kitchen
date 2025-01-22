use axum::{response::Result, routing::get, Json, Router};

use super::models::{PostUser, User};

pub fn routes() -> Router {
    Router::new().route("/users", get(get_users).post(post_users))
}

async fn get_users() -> Result<Json<User>> {
    Ok(Json(User {
        id: 42,
        email: "abc".to_string(),
        token: "4243".to_string(),
    }))
}

async fn post_users(Json(params): Json<PostUser>) -> Result<Json<User>> {
    params.password;
    Ok(Json(User {
        id: 42,
        email: params.email.clone(),
        token: "4242".to_string(),
    }))
}
