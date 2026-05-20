# 🚀 Deploy no GitHub + Vercel — Ouro Digital

## Passo 1 — Criar repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nome do repositório: `ouro-digital`
3. Deixe como **Public** (necessário para Vercel gratuito)
4. Clique em **Create repository**

## Passo 2 — Fazer upload dos arquivos

### Opção A — Via interface do GitHub (mais fácil):
1. Na página do repositório, clique em **"uploading an existing file"**
2. Arraste os arquivos:
   - `index.html`
   - `vercel.json`
   - `logo.png` ← **salve sua logo com exatamente este nome!**
3. Clique em **Commit changes**

### Opção B — Via terminal (Git):
```bash
git init
git add .
git commit -m "feat: landing page Ouro Digital"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/ouro-digital.git
git push -u origin main
```

---

## Passo 3 — Deploy automático no Vercel

1. Acesse [vercel.com](https://vercel.com) e clique em **"Sign Up with GitHub"**
2. Clique em **"New Project"**
3. Encontre o repositório `ouro-digital` e clique em **"Import"**
4. Clique em **"Deploy"** ✅

O Vercel vai gerar automaticamente uma URL como:
`https://ouro-digital.vercel.app`

---

## Passo 4 — Domínio personalizado (opcional)

1. No painel do Vercel, vá em **Settings → Domains**
2. Adicione seu domínio: `www.ourodigital.com.br`
3. Configure os DNS no seu provedor de domínio conforme instruções do Vercel

---

## ✅ Após o deploy, personalize:

- **WhatsApp**: Substitua `5500000000000` pelo seu número real (com DDI 55)
- **E-mail**: Substitua `contato@ourodigital.com` pelo seu e-mail real
- **Redes sociais**: Adicione os links corretos nas âncoras do rodapé
- **Estatísticas**: Ajuste os números no Hero e Resultados

---

## 🔄 Atualizações futuras

Sempre que você fizer um commit no GitHub, o Vercel fará o **deploy automático** em segundos!
