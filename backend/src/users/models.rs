use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct PostUser {
    pub email: String,
    pub password: String,
}

#[derive(Serialize, Clone)]
pub struct User {
    pub id: i32,
    pub email: String,
    pub token: String,
}
