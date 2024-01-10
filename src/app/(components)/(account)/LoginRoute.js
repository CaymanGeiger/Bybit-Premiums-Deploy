// pages/api/login.js
"use client"
import bcrypt from 'bcryptjs';
import prisma from '../../../../lib/prisma'; // Adjust the import path according to your setup

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        try {
            const user = await prisma.account.findUnique({
                where: { username }
            });

            if (user && bcrypt.compareSync(password, user.password)) {
                // Passwords match
                res.status(200).json({ message: 'Login successful' });
            } else {
                // User not found or passwords don't match
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
