import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEvent } from 'react';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    redirect: string | null;
};

export default function Register() {
    const { redirect } = usePage<{ redirect?: string | null }>().props;
    const form = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        redirect: redirect ?? null,
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post('/register', {
            onFinish: () => form.reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Регистрация">
                <meta
                    name="description"
                    content="Регистрация администратора для модерации никнеймов Dota 2."
                />
            </Head>
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                <div className="w-full max-w-md rounded-lg border border-white/20 bg-black/80 p-8 shadow-2xl">
                    <div className="mb-6 text-center">
                        <h1 className="mt-2 text-3xl font-semibold text-white">Регистрация</h1>
                    </div>
                    <h2 className="sr-only">Форма регистрации</h2>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="text-xs uppercase text-white/60">Имя</label>
                            <input
                                type="text"
                                name="name"
                                value={form.data.name}
                                onChange={(event) => form.setData('name', event.target.value)}
                                className="mt-2 w-full rounded-md border border-white/30 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500"
                            />
                            {form.errors.name && (
                                <p className="mt-1 text-xs uppercase tracking-widest text-red-400">{form.errors.name}</p>
                            )}
                        </div>
                        <div>
                            <label className="text-xs uppercase text-white/60">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.data.email}
                                onChange={(event) => form.setData('email', event.target.value)}
                                className="mt-2 w-full rounded-md border border-white/30 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500"
                            />
                            {form.errors.email && (
                                <p className="mt-1 text-xs uppercase tracking-widest text-red-400">{form.errors.email}</p>
                            )}
                        </div>
                        <div>
                            <label className="text-xs uppercase text-white/60">Пароль</label>
                            <input
                                type="password"
                                name="password"
                                value={form.data.password}
                                onChange={(event) => form.setData('password', event.target.value)}
                                className="mt-2 w-full rounded-md border border-white/30 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500"
                            />
                            {form.errors.password && (
                                <p className="mt-1 text-xs uppercase tracking-widest text-red-400">
                                    {form.errors.password}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="text-xs uppercase text-white/60">Повтори пароль</label>
                            <input
                                type="password"
                                name="password_confirmation"
                                value={form.data.password_confirmation}
                                onChange={(event) => form.setData('password_confirmation', event.target.value)}
                                className="mt-2 w-full rounded-md border border-white/30 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="w-full rounded-md bg-gradient-to-r from-red-700 to-red-500 px-4 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:from-red-600 hover:to-red-400 disabled:opacity-60"
                        >
                            Создать аккаунт
                        </button>
                    </form>
                    <div className="mt-6 text-center text-sm text-white/60">
                        Уже есть аккаунт?{' '}
                        <Link href="/login" className="text-red-400 underline-offset-4 hover:text-red-300">
                            Войти
                        </Link>
                    </div>
                    <div className="mt-2 text-center text-sm text-white/60">
                        <Link href="/" className="text-red-400 underline-offset-4 hover:text-red-300">
                            ← На главную
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
