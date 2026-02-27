# MediStore - Online Medicine Store

A full-stack **online medicine store** built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI.  
Users can browse medicines, add to cart, place orders, leave reviews, and track their orders.  
Admins manage medicines, categories, orders, and users (including banning).  
Sellers manage their own medicines and view orders containing their products.

**Live Demo**: (Vercel/Netlify link here)

## Features

### Customer
- Browse medicines with search, category, price range, manufacturer filters
- View detailed medicine info (description, stock, reviews, average rating)
- Add to cart & checkout
- View & manage profile
- View order history 
- Leave reviews after purchase
- Cancel pending orders

### Seller
- Manage own medicines 
- View orders containing their medicines 
- Update order status (SHIPPED, DELIVERED, CANCELLED) for orders with their items

### Admin
- Manage categories 
- Manage all medicines 
- Manage users (view list, ban/activate)
- Manage all orders (view list, update status, view details)
- Protected routes with role-based middleware

### General
- Responsive design (mobile-first)
- Role-based route protection (middleware)
- Real-time cart (context-based)
- Toast notifications (react-hot-toast)
- Pagination & search in lists
- Loading skeletons

