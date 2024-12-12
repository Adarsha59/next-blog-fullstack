# Next-Blog-Fullstack

A full-stack blog application built with **Next.js** (App Router) and **Tailwind CSS**. It includes features like dark/light mode toggle, responsive design, and dynamic blog post pages.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Frontend Overview](#frontend-overview)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)

## Installation

Clone the repository:

```bash
git clone https://github.com/Adarsha59/next-blog-fullstack.git
cd next-blog-fullstack
```


# Features & Overview

This application includes the following features:

- **Navbar**: Fully responsive with links to different sections and a dark/light mode toggle.
- **Search Bar**: Allows users to search for blog posts.
- **Categories & Tags**: Display filters for blog posts by category and popular tags.
- **Featured & Recent Posts**: Showcase featured posts and recently added content.
- **Newsletter Subscription**: A form to collect user email addresses for updates.
- **Dynamic Blog Post Pages**: Displays individual blog posts dynamically using the title as a slug (e.g., `/blog/[slug]`).

## Frontend Overview

The homepage contains:

- A search bar to search for blog posts.
- Categories to filter blog posts by topics.
- Featured posts and recent posts sections to highlight key or recently published content.
- Popular tags to show trending topics.
- A newsletter subscription form to collect user emails.

The blog post page (`/blog/[slug]`) dynamically loads individual posts based on the title. The design is responsive, styled with Tailwind CSS, and includes animations as well as a dark/light mode toggle.

## Technologies Used

- **Next.js (App Router)**: For building the app with modern React features.
- **Tailwind CSS**: For styling the app and ensuring responsive design.
- **React**: For creating interactive components and managing state.
