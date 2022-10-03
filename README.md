# Gist Based Blog

## Nextjs + Portfolio and Biography from Github + Posts from Gist ➡️ Your Personal Blog 🥳

This blog system gets all informations from Github and Gist.

## Demo

🚀 https://gist-based-blog.vercel.app/

## How to use

1. Clone the repo.
   First, clone the repo and install the dependencies.

```bash
git clone https://github.com/nurcinozer/gist-blog.git .
cd gist-based-blog
npm install
```

2. Add your GitHub token and username.
   Create a new file called `.env` in the root of the project and add your GitHub token.

```bash
GITHUB_TOKEN=YOUR_TOKEN
GITHUB_NAME=YOUR_GITHUB_USERNAME
```

3. Run the project

```bash
npm run dev
```

4. Open the project

```bash
http://localhost:3000
```

## How to create a post

1. Create a new gist with markdown extension (`.md`) and add this format for the metadata:

```md
---
category: "Post category"
---

Your content here
```

## Tech Stack

- Typescript
- Nextjs
- Github API
- Tailwindcss
- Tailblocks

## Contributing

This project is `hacktoberfest` friendly 🎉

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/nurcinozer/gist-blog/issues) and [contributing page](https://github.com/nurcinozer/gist-blog/blob/main/CONTRIBUTING.md) if you want to contribute.

## Show your support

Give a ⭐️ if this project helped you!

## Inspiration

- [Github Blog](https://github.com/bufgix/github-blog)
- [React Blog Github](https://github.com/saadpasta/react-blog-github)
