-- Este script crea la estructura de tablas para Supabase (PostgreSQL)
-- Puedes ejecutarlo en el SQL Editor de tu proyecto en Supabase.

-- 1. Tabla de Perfiles (Se sincroniza con auth.users)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  nombre text not null,
  nivel text,
  departamento text,
  rol text,
  asic_id text,
  status text default 'active',
  last_login timestamp with time zone default now()
);

-- Trigger para crear perfil automáticamente al registrarse en Supabase
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, nombre, nivel, departamento, rol, asic_id)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'nombre',
    new.raw_user_meta_data->>'nivel',
    new.raw_user_meta_data->>'departamento',
    new.raw_user_meta_data->>'rol',
    new.raw_user_meta_data->>'asicId'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Sistema de Banners y Alertas (Broadcast)
create table banners (
  id uuid default gen_random_uuid() primary key,
  type text not null,
  message text not null,
  active boolean default true,
  created_at timestamp with time zone default now()
);

-- 3. Tickets de Soporte Técnico
create table tickets (
  id text primary key,
  subject text not null,
  asic text,
  user_name text,
  status text default 'open',
  priority text default 'medium',
  created_at timestamp with time zone default now()
);

-- 4. Logs de Auditoría (Trazabilidad)
create table audit_logs (
  id uuid default gen_random_uuid() primary key,
  action text not null,
  entity text not null,
  details text,
  user_name text,
  asic text,
  ip_address text,
  created_at timestamp with time zone default now()
);

-- 5. Organización y Topología (Simulación de DHIS2 Orgunits)
create table organisation_units (
  id text primary key,
  name text not null,
  level integer not null,
  parent_id text references organisation_units(id)
);
