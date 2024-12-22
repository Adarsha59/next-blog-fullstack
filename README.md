# Next-Blog-Fullstack

A full-stack blog application built with **Next.js** (App Router) and **Tailwind CSS**. This platform enables anyone to write, manage, and share blog posts easily. It includes features like dark/light mode toggle, responsive design, and dynamic blog post pages.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Features](#features--overview)
- [Frontend Overview](#frontend-overview)
- [Admin Panel](#admin-panel)
- [Technologies Used](#technologies-used)
- [Demo](#-demo)
- [Developer Information](#developer-information)
- [Contribution](#-contribution)

## Introduction

Welcome to **Next-Blog-Fullstack**, a platform where anyone can write and share their thoughts through blog posts. Whether you're an experienced writer or just starting, this application allows you to easily create, manage, and share your blog posts with the world. Users can write new blogs, edit or delete existing ones, and manage content effortlessly through the Admin Panel. It's a simple yet powerful tool for publishing your ideas, stories, and insights.

## Installation

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/Adarsha59/next-blog-fullstack.git
cd next-blog-fullstack
```

```bash
npm install
npm run dev
The application should now be running on http://localhost:3000.
```

## Features & Overview

This application includes the following features:

## Navbar

- Fully responsive, adapting to desktop, tablet, and mobile views.
- Links to different sections of the site, such as Home, Blog, Categories, and About.
- A dark/light mode toggle to switch between themes for better readability.

## Search Bar

- Allows users to search for blog posts based on keywords or phrases.
- Located prominently on the homepage for easy access.

## Categories & Tags

- Filter blog posts by specific categories (e.g., Tech, Lifestyle, etc.) to help users find relevant content.
- Popular tags are also available to quickly navigate and discover related posts.

## Featured & Recent Posts

- Displays highlighted blog posts as featured content on the homepage.
- Recently added posts are showcased to keep the content fresh and updated.

## Newsletter Subscription

- A form that allows users to subscribe to the newsletter by entering their email addresses.
- Helps collect email addresses for updates and engagement with readers.

## Dynamic Blog Post Pages

- Each blog post has its own dedicated page, dynamically created using the title as a slug (e.g., `/blog/[slug]`).
- Users can view individual blog posts with all associated content (text, images, etc.).

## Frontend Overview

### Homepage

The homepage contains several key features:

- **Search Bar**: Search for blog posts by keywords or phrases.
- **Categories & Tags**: Quickly navigate content by filtering through categories and popular tags.
- **Featured & Recent Posts**: Highlight key content and showcase the latest posts.
- **Newsletter Subscription Form**: Collect user emails for updates and engagement.

### Blog Post Page

The blog post page (`/blog/[slug]`) dynamically loads individual posts based on the title, providing a user-friendly and responsive design. The page is styled with **Tailwind CSS** and supports both dark and light modes for an optimal reading experience.

## Admin Panel

The Admin Panel provides essential tools for managing blog content:

- **Login for Admins**: Secure authentication system for admin users to log in and manage content.
- **Blog Management**: Admin users can add, edit, or delete blog posts effortlessly.
- **Dashboard Features**: Visualize blog statistics, manage content, and track user engagement, including views and comments.

## Technologies Used

- **Next.js (App Router)**: Framework for building React applications with modern features such as server-side rendering (SSR) and API routes.
- **React**: Used for developing dynamic, interactive user interfaces.
- **Tailwind CSS**: A utility-first CSS framework that allows for responsive and modern design.
- **MongoDB (optional)**: A NoSQL database for storing blog content, user data, and comments.
- **Node.js**: Backend runtime for handling server-side functionality, including data fetching, authentication, and more.

# 🍿 Demo

- Check out our live demo at https://hamroblog.vercel.app/

- Source code https://github.com/Adarsha59/next-blog-fullstack.git

# Developer Information

## Name

Adarsha Paudyal

## Contact Information

- **Email:** code.adarsha@gmail.com
- **GitHub:** [github.com/Adarsha59/](https://github.com/Adarsha59/)

# 😍 Contribution

Contributions are always welcome, open a **Pull Request** and help us improve the project.
