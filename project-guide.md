# Full Stack Project: Part 1 – Books App (Rails + Angular)

## Overview
In this part, you will set up both the backend and frontend for a Books application using Ruby on Rails and Angular. You will:
- Scaffold a new Rails API project
- Set up RSpec, FactoryBot, and Faker for testing
- Write and pass RSpec tests for your Book model and controller
- Add serialization with Blueprinter
- Scaffold a new Angular project
- Create an Angular model, service, and component for Book
- Connect the Angular frontend to the Rails backend (API calls)
- Handle CORS issues for local development

---

## Exercises Part 1: July 17, 2025

### 1. Rails API Project Setup
- Create a new Rails API project:
  ```bash
  rails new books_api --api
  ```

- Add the following gems to your Gemfile:
  ```ruby
  group :development, :test do
    gem "debug", platforms: %i[ mri mingw x64_mingw ]
    gem 'rspec-rails'
    gem 'factory_bot_rails'
    gem 'faker'
  end
  gem 'blueprinter'
  ```
- Run:
  ```bash
  bundle install
  ```

### 2. RSpec & FactoryBot Setup
- Install RSpec:
  ```bash
  rails generate rspec:install
  ```
- In `rails_helper.rb`, add:
  ```ruby
  require 'faker'
  RSpec.configure do |config|
    config.include FactoryBot::Syntax::Methods
  end
  ```

### 3. Book Model & Tests
- Generate a Book model with `title:string`, `author:string`, and `read:boolean`:
  ```bash
  rails g model Book title:string author:string read:boolean
  rails db:migrate
  ```
- Create a FactoryBot factory for Book:
  ```ruby
  FactoryBot.define do
    factory :book do
      title { Faker::Book.title }
      author { Faker::Book.author }
      read { false }
    end
  end
  ```
- Write RSpec model tests for Book, including:
  - Valid with all attributes
  - Invalid without a title
  - Invalid without an author
  - Invalid if `read` is nil
- Add any necessary validations to your Book model to pass these tests.

### 4. Books Controller & Tests
- Generate a Books controller:
  ```bash
  rails g controller books
  ```
- Write RSpec request specs for the controller (index, show, create, update, destroy). Use a structure similar to the Todo example in the reading, including:
  - Checking for correct JSON structure
  - Status codes
  - Count changes on create/destroy
  - Attribute updates on update
- Add routes for the books resource in `config/routes.rb`:
  ```ruby
  resources :books
  ```
- Make sure your controller passes all tests.

### 5. Serialization with Blueprinter
- Generate a blueprint for the Book model:
  ```bash
  rails g blueprinter:blueprint book
  ```
- Use the blueprint in your controller responses so API output matches the expected structure in your tests.

### 6. (Optional but recommended) CORS Setup
- Add the `rack-cors` gem to your Gemfile:
  ```ruby
  gem 'rack-cors'
  ```
- Run:
  ```bash
  bundle install
  ```
- In `config/initializers/cors.rb`, allow requests from your Angular app:
  ```ruby
  Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins '*'
      resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
  end
  ```

### 7. Angular Frontend Setup
- Create a new Angular project:
  ```bash
  ng new fe_books 
  ```
- Generate a Book model:
  ```bash
  ng g class models/book
  ```
  Example:
  ```typescript
  export class Book {
    id!: number;
    title: string = '';
    author: string = '';
    read: boolean = false;
  }
  ```
- Generate a Book service:
  ```bash
  ng g s services/book
  ```
  In the service, add methods for CRUD operations using Angular's HttpClient.
- Generate a Book list component:
  ```bash
  ng g c book-list --standalone
  ```
- In your component, display the list of books and allow adding, updating, and deleting books using the service.
- Make sure to import `HttpClientModule` in your app config/module.

### 8. Connect Angular to Rails API
- In your Book service, set the API URL to `http://localhost:3000/books`.
- Test that you can fetch, create, update, and delete books from the Angular frontend.

---

## Exercises Part 2: July 21, 2025

### 1. User Authentication Setup (Rails)
- Generate a User model with `username:string` and `password_digest:string`:
  ```bash
  rails generate model User username:string password_digest:string
  rails db:migrate
  ```
- Add `has_secure_password` and a presence validation for username in your User model:
  ```ruby
  class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true
  end
  ```
- Add the `bcrypt` gem to your Gemfile and run:
  ```bash
  bundle install
  ```

### 2. User Registration & Login Endpoints (Rails)
- Generate a Users controller and add a `create` action for registration.
- Generate a Sessions controller and add a `create` action for login using JWT.
- Add the `jwt` gem to your Gemfile and run:
  ```bash
  bundle install
  ```
- In your Sessions controller, implement JWT token creation as shown in the reading.
- Update your routes:
  ```ruby
  post '/login', to: 'sessions#create'
  resources :users, only: [:create]
  resources :books
  ```

### 3. JWT Authentication Middleware (Rails)
- In `ApplicationController`, add an `authenticate_request` method that decodes the JWT and sets `@current_user`.
- Use this method as a `before_action` to protect any routes that should require authentication.

### 4. Angular Authentication Service & Login
- In your Angular app, generate an authentication service:
  ```bash
  ng g s services/authentication
  ```
- Implement methods for `login`, `setToken`, `getToken`, `isLoggedIn`, and `logout` as shown in the reading.
- Generate a login component and build a login form that calls the authentication service and stores the JWT in local storage.
- Add a route for the login page in your Angular app.

### 5. Route Guards (Angular)
- Generate an auth guard to protect routes that require authentication:
  ```bash
  ng generate guard auth
  ```
- Generate a no-auth guard to prevent logged-in users from accessing the login page:
  ```bash
  ng generate guard no-auth
  ```
- Apply these guards to your routes as shown in the reading.

### 6. Navbar & Logout (Angular)
- Generate a navbar component that displays login/logout links based on authentication state.
- Implement the logout functionality to clear the token and redirect to the login page.

### 7. Test the Flow
- Create a user in the Rails console:
  ```ruby
  User.create(username: 'test', password: 'password', password_confirmation: 'password')
  ```
- Start both the Rails and Angular servers.
- Test registration, login, route protection, and logout from the Angular frontend.

---

## Exercises Part 3: July 24, 2025

### 1. Add Book Creation for Authenticated Users (Rails)
- Update your Rails `BooksController` so that only authenticated users can create books.
- In your controller, use `before_action :authenticate_request, except: [:index, :show]` to protect create, update, and destroy actions.
- In the `create` action, associate the new book with the current user (e.g., `@current_user.books.new(book_params)`).
- Update your Book model to include a `user:references` association:
  ```bash
  rails g migration add_user_id_to_books user:references
  rails db:migrate
  ```
- Update your Book model:
  ```ruby
  class Book < ApplicationRecord
    belongs_to :user
    # ...existing code...
  end
  ```
  And your User model:
  ```ruby
  class User < ApplicationRecord
    has_many :books
    # ...existing code...
  end
  ```
- Update your strong parameters to remove `user_id` from permitted params (the backend should set it from the authenticated user).

### 2. Angular: Add Book Creation Form for Logged-In Users
- In your Angular app, create a component for adding a new book (e.g., `ng g c book-new --standalone`).
- Add a route for the new book form (e.g., `/books/new`).
- In the form, collect `title`, `author`, and `read` fields.
- On submit, call the Book service to create a new book (the JWT will be sent automatically if you use an HTTP interceptor).
- After creation, redirect to the book list or home page.

### 3. Angular: Protect Book Creation Route
- Use your auth guard to ensure only logged-in users can access the book creation form.

### 4. Angular: Token Interceptor
- If not already done, create an HTTP interceptor to add the JWT token to all outgoing requests:
  ```bash
  ng generate interceptor auth-token
  ```
- Register the interceptor in your Angular app config/module.

### 5. Test the Flow
- Log in as a user and create a new book from the Angular frontend.
- Confirm that unauthenticated users cannot create books (should be redirected or receive an error).
- Confirm that the created book is associated with the logged-in user in the database.

---

## Exercises Part 4: July 28, 2025

### 1. Add User Signup (Rails & Angular)
- In your Rails API, ensure the Users controller supports user registration (sign up) with all required fields (e.g., username, password, password_confirmation; add email/first_name/last_name if you want to extend).
- In your Angular app, update the authentication service to include a `signup` method that sends a POST request to `/users`.
- Generate a signup component in Angular (e.g., `ng g c signup --standalone`).
- Build a signup form that collects the required fields and calls the authentication service on submit.
- Add a route for the signup page and a link to it in your navbar.

### 2. Protect and Display User-Specific Books (Rails & Angular)
- In your Rails API, update the Book model and controller so each book belongs to a user.
- Add a route and controller action (e.g., `/my_books`) that returns only the books for the currently authenticated user.
- In your Angular Book service, add a method to fetch the current user's books (e.g., `getMyBooks`).
- In your Angular book list component, use this method to display only the logged-in user's books.

### 3. Ensure Token is Sent with All Requests (Angular)
- Confirm your HTTP interceptor is sending the JWT with all requests that require authentication.

### 4. Test the Full Flow
- Sign up as a new user and log in.
- Create books and confirm they are associated with the correct user.
- Log out and sign up/log in as a different user; confirm you only see your own books.
- Test error handling for failed signups/logins and display user feedback in the UI.

---
