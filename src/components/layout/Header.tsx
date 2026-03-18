"use client";

import React, { useEffect } from "react";
import Button from '../shared/Button'
import Link from 'next/link'
import { useAuthStore } from "@/store/useAuthStore";
import { LogOut, UserCircle } from "lucide-react";
import Image from "next/image";

export default function Header() {
    const { user, isAuthenticated, isLoading, logout, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <header className="w-full p-4  shadow-2xl flex bg-[url('/assets/AbstractDesign.svg')] bg-cover bg-center bg-repeat ">
            <div className="container flex justify-between items-center">
                <Link href='/' >
                    <span className="text-2xl font-bold  text-transparent bg-clip-text bg-linear-to-r from-primary to-cyan-400" >logo</span>
                </Link>

                <div className="flex items-center gap-3">
                  {isLoading ? (
                    <div className="h-10 w-24 bg-gray-800/60 rounded-lg animate-pulse"></div>
                  ) : isAuthenticated && user ? (
                    <>
                      {/* User Info */}
                      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-800/40 border border-gray-700/50">
                        {user.avatar ? (
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={28}
                            height={28}
                            className="w-7 h-7 rounded-full object-cover border border-gray-600"
                          />
                        ) : (
                          <UserCircle className="w-6 h-6 text-gray-400" />
                        )}
                        <span className="text-sm text-gray-300 font-medium max-w-[120px] truncate">
                          {user.name}
                        </span>
                      </div>

                      {/* Logout Button */}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={logout}
                        leftIcon={<LogOut className="w-4 h-4" />}
                      >
                        <span className="hidden sm:inline">Logout</span>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" href="/login">
                        Sign In
                      </Button>
                      <Button
                        size="sm"
                        href="/signup"
                        className="shadow-md shadow-primary/20"
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
            </div>
        </header>
    )
}
