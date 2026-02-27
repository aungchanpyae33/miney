# Miney (မိုင်နီ) <img src="https://miney-bubble.vercel.app/logo.svg" width=100 height=26.7  />

<p>
<img  src="https://img.shields.io/badge/version-v1.0.0-3B82F6">
<img  src="https://img.shields.io/badge/license-MIT-green">
</p>

**Miney** is a social profile platform where you can **share** your interests, favorites, and personality in one simple card to other people.

## 🎥 Demo video

### Desktop View

[![Laptop Demo](https://img.youtube.com/vi/EPQ2QsEgVIk/maxresdefault.jpg)](https://youtu.be/EPQ2QsEgVIk)
**click the thumbnail to see the demo video.**

### Mobile View

[![Mobile Demo](https://img.youtube.com/vi/kT9Y1QGED8I/maxresdefault.jpg)](https://youtube.com/shorts/kT9Y1QGED8I)
**click the thumbnail to see the demo video.**

## Live Demo

Start creating your Profile on Miney. 😁
[https://miney-bubble.vercel.app](https://miney-bubble.vercel.app)

## The main Tech stack i used in Miney

![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white) ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

## Run Locally

This project uses **Supabase** for Auth, Database, and Storage. Follow the steps below to get the project running on your machine.

### Prerequisites

- **Node.js**: version `>22`
- **Package Manager**: `pnpm`
- **Docker**: Required for running Supabase locally.

---

### 1. Clone the Project

Bash

```
git clone https://github.com/aungchanpyae33/miney.git
```

```
cd miney
```

```
pnpm install
```

### 2. Environment Variables

1.  Rename `.env.example` to `.env.local`.
2.  Keep this file ready; you will fill in the keys after starting Supabase.

### 3. Start Supabase Locally

Ensure **Docker** is running, then execute:

Bash

```bash
pnpm dlx supabase start
```

_This command will automatically create your database tables, RLS policies, and the `miney_avater` storage bucket based on the project configuration(config.toml)._

### 4. Connect the App

Once the command finishes, copy the key from the terminal output into your `.env.local` file.

## Deploying to Supabase Cloud

If you want to move your local changes to a live Supabase project, follow these steps:

### 1. Login & Link

Bash

```
pnpm dlx supabase login
```

```
pnpm dlx supabase link --project-ref your-project-id
```

### 2. Push Database & Policies

Bash

```
pnpm dlx supabase db push
```

### ⚠️ Important: Manual Cloud Configuration

Unlike `supabase start`, the `db push` command **only** syncs the database. You must manually configure the following in your Supabase Cloud Dashboard to match the `config.toml`. **For example** -

- **Storage**: Go to the Storage tab and create a bucket named `miney_avater`. Set it to **Public**.

- **Auth Settings**: Go to **Authentication > Auth Settings** and set the Password Complexity to require **Lowercase, Uppercase, Digits,
  and Symbols**.

- **Site URL**: Update the Site URL and Redirect URLs in the Auth settings to your production URL.

---

## Support

If you find this project useful, please give it a ⭐!

[![GitHub stars](https://img.shields.io/github/stars/aungchanpyae33/miney?style=social)](https://github.com/aungchanpyae33/miney)

## Contribution

Contributions are welcome!

Please read the [contribution guide](CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
