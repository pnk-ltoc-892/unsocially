import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

import AppBackground from '@/components/common/AppBackground.jsx'
import BrandPanel from '@/components/landing/BrandPanel.jsx'
import Wordmark from '@/components/landing/Wordmark.jsx'
import Spinner from '@/components/UI Components/Spinner.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { toast } from '@/hooks/use-toast.js'
import { clearAuthError, loginUser, registerUser } from '@/store/slices/authSlice.js'

const emptyForm = {
    identifier: '',
    username: '',
    email: '',
    password: '',
}

const Login = () => {
    const { isLoading, error } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState(emptyForm);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const updateField = (field) => (event) => {
        setFormData({ ...formData, [field]: event.target.value });
    }

    const switchMode = (nextIsLoginMode) => {
        if (nextIsLoginMode === isLoginMode) return;
        setIsLoginMode(nextIsLoginMode);
        setShowPassword(false);
        dispatch(clearAuthError());
    }

    const isValid = isLoginMode
        ? formData.identifier.trim() !== '' && formData.password !== ''
        : formData.username.trim() !== '' && formData.email.trim() !== '' && formData.password !== '';

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValid || isLoading) return;

        if (isLoginMode) {
            // The API matches on `$or: [{ username }, { email }]`, so send whichever
            // field the entered value looks like.
            const identifier = formData.identifier.trim();
            const credentials = identifier.includes('@')
                ? { email: identifier, password: formData.password }
                : { username: identifier, password: formData.password };

            dispatch(loginUser(credentials))
                .unwrap()
                .then(() => {
                    toast({ title: "Welcome back" });
                })
                .catch((message) => {
                    toast({ variant: "destructive", title: "Could not sign you in", description: message });
                });
            return;
        }

        dispatch(registerUser({
            username: formData.username.trim(),
            email: formData.email.trim(),
            password: formData.password,
        }))
            .unwrap()
            .then(() => {
                toast({ title: "Account created", description: "Welcome to unsocially." });
            })
            .catch((message) => {
                toast({ variant: "destructive", title: "Could not create your account", description: message });
            });
    }

    return (
        <div className="relative grid min-h-screen lg:grid-cols-2">
            <AppBackground />
            <BrandPanel />

            <main className="relative z-10 flex items-center justify-center px-6 py-12">
                <div className="glass-card w-full max-w-md rounded-3xl p-8">
                    <Link to="/" className="mb-10 inline-block text-foreground lg:hidden">
                        <Wordmark className="text-4xl" />
                    </Link>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                            {isLoginMode ? 'Welcome back' : 'Create your account'}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {isLoginMode
                                ? 'Sign in to pick up where you left off.'
                                : 'Join unsocially and start sharing in minutes.'}
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-1 rounded-full bg-muted p-1">
                        <button
                            type="button"
                            onClick={() => switchMode(true)}
                            aria-pressed={isLoginMode}
                            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${isLoginMode ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => switchMode(false)}
                            aria-pressed={!isLoginMode}
                            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${!isLoginMode ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Register
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
                        {isLoginMode ? (
                            <div className="space-y-2">
                                <Label htmlFor="identifier">Email or username</Label>
                                <Input
                                    id="identifier"
                                    name="identifier"
                                    type="text"
                                    autoComplete="username"
                                    placeholder="you@example.com"
                                    value={formData.identifier}
                                    onChange={updateField('identifier')}
                                    aria-invalid={Boolean(error)}
                                />
                            </div>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="username"
                                        placeholder="yourname"
                                        value={formData.username}
                                        onChange={updateField('username')}
                                        aria-invalid={Boolean(error)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={updateField('email')}
                                        aria-invalid={Boolean(error)}
                                    />
                                </div>
                            </>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete={isLoginMode ? 'current-password' : 'new-password'}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={updateField('password')}
                                    aria-invalid={Boolean(error)}
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p role="alert" className="text-sm text-destructive">
                                {error}
                            </p>
                        )}

                        <Button type="submit" className="w-full" disabled={!isValid || isLoading}>
                            {isLoading ? <Spinner /> : (isLoginMode ? 'Login' : 'Create account')}
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        {isLoginMode ? "Don't have an account? " : 'Already have an account? '}
                        <button
                            type="button"
                            onClick={() => switchMode(!isLoginMode)}
                            className="font-medium text-foreground underline-offset-4 hover:underline"
                        >
                            {isLoginMode ? 'Register' : 'Login'}
                        </button>
                    </p>
                </div>
            </main>
        </div>
    )
}

export default Login
