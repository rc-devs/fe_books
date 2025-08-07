## Add Book Cover Image Uploads (Rails + Angular + Cloudinary)

In this part, you will extend your Books App to support uploading and displaying cover images for books. You will use Active Storage for local development and Cloudinary for production, following the reading and lecture material.

---

### 1. Add Active Storage to Rails API

- Run the following in your Rails API project:
  ```bash
  rails active_storage:install
  rails db:migrate
  ```
- Add `has_one_attached :cover_image` to your `Book` model:

  ```ruby
  class Book < ApplicationRecord
    # ...existing code...
    has_one_attached :cover_image
    # ...existing code...
  end
  ```
- Update your `BooksController` to permit the `cover_image` parameter in `book_params`:
  ```ruby
  params.permit(:title, :author, :read, :cover_image)
  ```

---

### 2. Update Book Serialization

- Add a method to your `Book` model to return the image URL:
  ```ruby
  include Rails.application.routes.url_helpers

  def cover_image_url
    rails_blob_url(self.cover_image, only_path: false) if self.cover_image.attached?
  end
  ```
- Add `cover_image_url` to your Book blueprint/serializer so it appears in API responses.

- In `config/environments/development.rb`, set:
  ```ruby
  Rails.application.routes.default_url_options[:host] = "localhost:3000"
  ```

---

### 3. Update Angular Frontend

- Update your Book model to include `cover_image_url: string`.
- In your book form component, add a file input for the cover image:
  ```html
  <input type="file" (change)="onFileSelected($event)" />
  ```
- In your component, handle file selection and use `FormData` to send the file with the book data when creating/updating a book. Make sure to use the key `cover_image` when appending the file to `FormData`.
- Update your book list component to display the cover image if available, or a placeholder if not.

---

### 4. Configure Cloudinary for Production

- Add the `cloudinary` gem to your Gemfile (in the `:production` group).
- Run `bundle install`.
- In `config/environments/production.rb`, set:
  ```ruby
  config.active_storage.service = :cloudinary
  ```
- In `config/storage.yml`, add a `cloudinary` service using credentials from your Cloudinary dashboard. Store sensitive info in Rails credentials as shown in the reading. Example YAML indentation:
  ```yaml
  cloudinary:
    service: Cloudinary
    cloud_name: <%= Rails.application.credentials.cloudinary[:cloud_name] %>
    api_key: <%= Rails.application.credentials.cloudinary[:api_key] %>
    api_secret: <%= Rails.application.credentials.cloudinary[:api_secret] %>
  ```
- Set the production host in `config/environments/production.rb`:
  ```ruby
  Rails.application.routes.default_url_options[:host] = "https://your-app-name.onrender.com"
  ```

---

### 5. Test and Deploy

- Test uploading and displaying book cover images locally.
- Deploy your backend (Render) and frontend (Vercel).
- Test image uploads and display in production (Cloudinary).

---

**Bonus:**  
- Allow users to update or remove a book’s cover image.
- Add image validation (e.g., only allow image files, limit file size).

---

