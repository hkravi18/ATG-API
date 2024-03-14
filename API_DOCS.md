# API DOCS 

## Table of Contents

- [API Routes](#api-routes)
- [API Response](#api-response)


> Note: _Private_ routes are protected and can only be accessed by users who have access to that action (For example: a post can be updated/deleted only by the user who created it). _Public_ routes are available for all users.

## API Routes

### Auth

- **POST /api/auth/signup**
  - Content-Type: _application/json_
  - Access: _Public_ 
  - Description: To Signup the user.

- **POST /api/auth/login**
  - Content-Type: _application/json_
  - Access: _Public_ 
  - Description: To login the user.

  
### Password

- **POST /api/password/forget**
  - Content-Type: _application/json_
  - Access: _Public_ 
  - Description: To generate token for password resetting and sending the mail.

- **POST /api/password/reset**
  - Content-Type: _application/json_
  - Access: _Public_ 
  - Description: To reset the password after verifying the token.

### Post

- **GET /api/posts**
  - Content-Type: _None_
  - Access: _Public_ 
  - Description: To get all the posts of all users.

- **GET /api/posts/:id**
  - Content-Type: _None_
  - Access: _Public_ 
  - Description: To retrieve a single post with the given id.

- **POST /api/posts/user**
  - Content-Type: _application/json_
  - Access: _Public_ 
  - Description: To get all the posts of a user.

- **POST /api/posts**
  - Content-Type: _application/json_
  - Access: _Private_ 
  - Description: To create a new post.

- **PUT /api/posts**
  - Content-Type: _application/json_
  - Access: _Private_ 
  - Description: To update a comment.     

- **DELETE /api/posts/:id**
  - Content-Type: _None_
  - Access: _Private_ 
  - Description: To delete a comment.     

### Comment

- **GET /api/comments**
  - Content-Type: _None_
  - Access: _Public_ 
  - Description: To get all the comments for all posts.

- **GET /api/comments/:id**
  - Content-Type: _None_
  - Access: _Public_ 
  - Description: To retrieve a single comment with the given id.

- **GET /api/comments/user**
  - Content-Type: _application/json_
  - Access: _Private_ 
  - Description: To get all the comments of a user.

- **POST /api/comments**
  - Content-Type: _application/json_
  - Access: _Private_ 
  - Description: To create a new post.

- **PUT /api/comments**
  - Content-Type: _application/json_
  - Access: _Private_ 
  - Description: To update a post.     

- **DELETE /api/comments/:id**
  - Content-Type: _None_
  - Access: _Private_ 
  - Description: To delete a post.     


### Like

- **GET /api/like/post/user**
  - Content-Type: _None_
  - Access: _Private_ 
  - Description: To get all the posts which the user has liked.

- **GET /api/like/:id**
  - Content-Type: _None_
  - Access: _Private_ 
  - Description: To like a post.



## API Response

### Signup/Login
On successful signup/login, the server will respond with a 200 status code and a JSON object containing the user's information.
  ```javascript 
  {
    ok: true,
    message: "success_message",
    data: {
        user: {
            username: "username",
            email: "email",
            toke: "token"
        }
    }
  }
  ```
  
  If the login is unsuccessful, the server will respond with a 400 Bad Request status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "error_message",
    data: {}
  }
  ```

### Forget Password
On succesfully sending a password reset token to the user's email address, the server will respond with 200 status code. 
  ```javascript 
  {
    ok: true,
    message: "If the email is registered, a password reset link will be sent.",
    data: {}
  }
  ```
  
If the forget request is unsuccessful from server end, the server will respond with a 500 status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "error_message",
    data: {}
  }
  ```

### Reset Password
On succesfully resetting the password, the server will respond with 200 status code. 
  ```javascript 
  {
    ok: true,
    message: "Password has been changed successfully.",
    data: {}
  }
  ```
  
If the password resetting is unsuccessful, the server will respond with a 403 forbidden status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "Password reset token is invalid or has expired.",
    data: {}
  }
  ```

### Post

- **GET /api/posts**
On succesfully retrieving all posts, the server will respond with 200 status code. 
  ```javascript 
  {
    ok: true,
    message: "Posts fetched successfully.",
    data: {
        posts: [posts]
    }
  }
  ```
  
If the fetching is unsuccessful, the server will respond with a 500  status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "Posts fetching failed.",
    data: {}
  }
  ```

- **GET /api/posts/:id**
On succesfully retrieving the single post with the given Id, the server will respond with 200 status code. 
  ```javascript 
  {
    ok: true,
    message: "Post fetched successfully.",
    data: {
        posts: {single_post}
    }
  }
  ```
  
If the fetching is unsuccessful, the server will respond with a 404/500  status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "Post fetching failed.",
    data: {}
  }

  OR

  {
    ok: false,
    error: "Post with given id does not exist.",
    data: {}
  }
  ```

- **POST /api/posts/user**
On succesfully retrieving all the posts for a given user, the server will respond with 200 status code. 
  ```javascript 
  {
    ok: true,
    message: "User's Posts fetched successfully.",
    data: {
        posts: {single_post}
    }
  }
  ```
  
If the fetching is unsuccessful, the server will respond with a 404/404/500  status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "User's Posts fetching failed.",
    data: {}
  }

  OR
  //if id is not provided or the user does not exist
  {
    ok: false,
    error: "User ID is required.",
    data: {}
  }
  ```


- **POST /api/posts**
On succesfully creating a new post, the server will respond with 200 status code. 
  ```javascript 
  {
    ok: true,
    message: "Post created successfully.",
    data: {
        posts: {created_post}
    }
  }
  ```
  
If the fetching is unsuccessful, the server will respond with a 400/500  status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "Post creation failed.",
    data: {}
  }

  OR
  //if post content is not provided
  {
    ok: false,
    error: "Post content is required.",
    data: {}
  }
  ```


- **PUT /api/posts**
On succesfully updating the post, the server will respond with 200 status code. 
  ```javascript 
  {
    ok: true,
    message: "Post updated successfully.",
    data: {
        posts: {updated_post}
    }
  }
  ```
  
If the fetching is unsuccessful, the server will respond with a 401/500  status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "Post updating failed.",
    data: {}
  }

  OR
  //if user has not created that post
  {
    ok: false,
    error: "User not authorized to update this post.",
    data: {}
  }
  ```
    

- **DELETE /api/posts/:id**
On succesfully deleting the post with the given Id, the server will respond with 200 status code. 
  ```javascript 
  {
    ok: true,
    message: "Post deleted successfully.",
    data: {
        posts: {deleted_post}
    }
  }
  ```
  
If the fetching is unsuccessful, the server will respond with a 404/500  status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "Post deletion failed.",
    data: {}
  }

  OR
  //if the post with given Id does not exist
  {
    ok: false,
    error: "Post with given id does not exist.",
    data: {}
  }
  ```
    

### Comment

- **GET /api/comments**
On succesfully fetching all the comments, the server will respond with 200 status code. 
  ```javascript 
  {
    ok: true,
    message: "Comments fetched successfully.",
    data: {
        comments: {comments}
    }
  }
  ```
  
If the fetching is unsuccessful, the server will respond with a 500  status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "Comments deletion failed.",
    data: {}
  }
  ```

- **GET /api/comments/:id**
On succesfully fetching the comment with the given Id, the server will respond with 200 status code. 
  ```javascript 
  {
    ok: true,
    message: "Comment fetched successfully.",
    data: {
        comments: {comment}
    }
  }
  ```
  
If the fetching is unsuccessful, the server will respond with a 404/500  status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "Comment fetching failed",
    data: {}
  }

  OR
  //if the comment with given Id does not exist
  {
    ok: false,
    error: "Comment with given id does not exist.",
    data: {}
  }
  ```

- **GET /api/comments/user**
On succesfully fetching all the comments of a user, the server will respond with 200 status code. 
  ```javascript 
  {
    ok: true,
    message: "Comments fetched successfully.",
    data: {
        comments: {comments}
    }
  }
  ```
  
If the fetching is unsuccessful, the server will respond with a 404/500  status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "Comments and Posts fetching failed",
    data: {}
  }
  ```

- **POST /api/comments**
On succesfully creating the comment, the server will respond with 200 status code. 
  ```javascript 
  {
    ok: true,
    message: "Comment created successfully.",
    data: {
        comments: {created_post}
    }
  }
  ```
  
If the fetching is unsuccessful, the server will respond with a 500  status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "Comment creation failed.",
    data: {}
  }
  ```

- **PUT /api/comments**
On succesfully updating the comment with the given Id, the server will respond with 200 status code. 
  ```javascript 
  {
    ok: true,
    message: "Comment updated successfully.",
    data: {
        comments: {updated_post}
    }
  }
  ```
  
If the fetching is unsuccessful, the server will respond with a 401/500  status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "Comment updating failed.",
    data: {}
  }

  OR
  //if the user is not authorized ot delete the comment
  {
    ok: false,
    error: "User not authorized to update this comment.",
    data: {}
  }
  ```

- **DELETE /api/comments/:id**
On succesfully deleting the comment with the given Id, the server will respond with 200 status code. 
  ```javascript 
  {
    ok: true,
    message: "Comment deleted successfully.",
    data: {
        comments: {deleted_comment}
    }
  }
  ```
  
If the fetching is unsuccessful, the server will respond with a 404/500  status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "Comment deletion failed.",
    data: {}
  }

  OR
  //if the comment with given Id does not exist
  {
    ok: false,
    error: "Comment with given id does not exist.",
    data: {}
  }
  ```




### Like

- **GET /api/like/post/user**
On succesfully fetching all the liked posts of a user, the server will respond with 200 status code. 
  ```javascript 
  {
    ok: true,
    message: "Liked Posts fetched Successfully",
    data: {
        likedPosts: {likePosts}
    }
  }
  ```
  
If the fetching is unsuccessful, the server will respond with a 404/500  status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "Liked Posts fetching failed.",
    data: {}
  }
  ```


- **GET /api/like/post/:id**
On succesfully liking the post, the server will respond with 200 status code. 
  ```javascript 
  {
    ok: true,
    message: "Like added to post Successfully",
    data: {}
  }
  ```
  
If the fetching is unsuccessful, the server will respond with a 404/500  status code and a JSON object containing an error message. 
  ```javascript 
  {
    ok: false,
    error: "Adding Like to Post failed",
    data: {}
  }

  OR
  //if the post with given Id does not exist
  {
    ok: false,
    error: "Post with given id does not exist.",
    data: {}
  }
  ```
