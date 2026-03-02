import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile, type AuthError } from "firebase/auth";
import { useState } from "react";
import { useAuth } from "reactfire";
import { useUserActions } from "./use-user-actions";

interface AuthActionResponse {
    success: boolean;
    error: AuthError | null;
}

export const useAuthActions = () => {
    const [loading, setLoading] = useState(false);
    const auth = useAuth();

    const {createOrUpdateUser} = useUserActions();

    const login = async (data: { email: string; password: string }) : Promise<AuthActionResponse> => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            return {
                success: true,
                error: null
            }
        } catch (error) {
            const authError = error as AuthError;
            return {
                success: false,
                error: authError
            };
        } finally {
            setLoading(false);
        }
    };

    const register = async (data: { email: string; password: string, displayName: string }) : Promise<AuthActionResponse> => {
        setLoading(true);
        try {            
            const currentUser = await createUserWithEmailAndPassword(auth, data.email, data.password);
            if(currentUser.user) {
                await updateProfile(currentUser.user, {
                    displayName: data.displayName
                });
                await createOrUpdateUser(currentUser.user);
                //Forzar recarga del usuario para actualizar el displayName en el contexto de ReactFire
                await currentUser.user.reload();
            }
            return {
                success: true,
                error: null
            }
        } catch (error) {
            const authError = error as AuthError;
            return {
                success: false,
                error: authError
            };
        } finally {            
            setLoading(false);
        }
    };

    const loginWithGoogle = async (): Promise<AuthActionResponse> => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const data = await signInWithPopup(auth, provider);
            await createOrUpdateUser(data.user);
            
            return {
                success: true,
                error: null
            }
        } catch (error) {
            const authError = error as AuthError;
            return {
                success: false,
                error: authError
            };
        } finally {
            setLoading(false);
        }
    }

    const logout = async (): Promise<AuthActionResponse> => {
        setLoading(true);
        try {
            await auth.signOut();
            return {
                success: true,
                error: null
            };
        } catch (error) {            
            const authError = error as AuthError;
            return {
                success: false,
                error: authError
            };
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        login,
        register,
        loginWithGoogle,
        logout
    };
}