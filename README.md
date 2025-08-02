# 🔗 URL Shortener

A modern full-stack URL shortener built using:

- 🚀 **Backend**: Express.js Microservices MongoDB 
- 🪵 **Custom Logger** Middleware  
- ⚛️ **Frontend**: React + Tailwind CSS  
- 📊 **Analytics**: Track click stats with metadata  


---

## ⚙️ Features

### 🛠 Backend (Express Microservices)
- Shortens valid URLs with optional custom codes
- URL expiration logic (validity in days)
- Click tracking: IP, referrer, browser metadata
- Modular microservices for scaling
- Custom `logger.js` for request logging

### 🎨 Frontend (React + Tailwind)
- Simple, clean UI to input and shorten URLs
- Optional custom alias and validity
- Shows shortened link and copy option
- Displays error messages and loading state

---


## Endpoints

### 1. Shorten a URL
- **Method**: POST
- **Path**: `/shortUrls`
- **Description**: Creates a shortened URL from a provided long URL.
- **Request Body**:
  ```json
  {
    "longUrl": "https://example.com",
    "shortCode":"asdlk",
    "validity":20
  }
  ```
- **Response**:
  - **201 Created**: Returns the shortened URL details.
    ```json
    {
      "shortCode": "abc123",
      "longUrl": "https://example.com",
      "shortUrl": "http://yourdomain.com/abc123"
    }
    ```
  - **400 Bad Request**: If the provided URL is invalid.
  - **500 Internal Server Error**: If there's an issue processing the request.

### 2. Get All Shortened URLs
- **Method**: GET
- **Path**: `/shortUrls`
- **Description**: Retrieves a list of all shortened URLs.
- **Response**:
  - **200 OK**: Returns an array of shortened URL objects.
    ```json
    [
      {
        "shortCode": "abc123",
        "longUrl": "https://example.com",
        "shortUrl": "http://yourdomain.com/abc123",
        "validity":133223
      },
    ]
    ```
  - **500 Internal Server Error**: If there's an issue retrieving the URLs.

### 3. Redirect to Original URL
- **Method**: GET
- **Path**: `/:shortCode`
- **Description**: Redirects to the original URL associated with the provided short code.
- **Parameters**:
  - `shortCode`: The unique code of the shortened URL (e.g., `abc123`).
- **Response**:
  - **302 Found**: Redirects to the original URL.
  - **404 Not Found**: If the short code does not exist.
  - **500 Internal Server Error**: If there's an issue processing the request.

### 4. Get URL Statistics
- **Method**: GET
- **Path**: `/:shortUrl/stats`
- **Description**: Retrieves statistics for a specific shortened URL.
- **Parameters**:
  - `shortUrl`: The unique code of the shortened URL (e.g., `abc123`).
- **Response**:
  - **200 OK**: Returns statistics for the shortened URL.
    ```json
    {
      "shortCode": "abc123",
      "longUrl": "https://example.com",
      "shortUrl":"http://localhost:3000/abc123",
      "clicks": 42,
      "location": "192.128"
    }
    ```
  - **404 Not Found**: If the short code does not exist.
  - **500 Internal Server Error**: If there's an issue retrieving the statistics.
