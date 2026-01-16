import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-black text-white font-fustat p-8 md:p-16">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl md:text-5xl font-bold font-fustat mb-8 text-primary-tint">Privacy Policy</h1>

                <p className="text-white/60">Last updated: {new Date().toLocaleDateString()}</p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">1. Introduction</h2>
                    <p className="text-white/80 leading-relaxed">
                        Welcome to Switch ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data.
                        This Privacy Policy explains how we collect, use, and share information about you when you use our website,
                        <a href="https://switchstyle.app" className="text-primary-tint hover:underline ml-1">switchstyle.app</a>, and our services.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">2. Information We Collect</h2>
                    <p className="text-white/80 leading-relaxed">
                        We may collect the following types of information:
                    </p>
                    <ul className="list-disc list-inside text-white/80 ml-4 space-y-2">
                        <li>Personal identification information (Name, email address, etc.) provided during signup.</li>
                        <li>User-generated content, such as images uploaded or generated using our AI tools.</li>
                        <li>Usage data, including how you interact with our services.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">3. How We Use Your Information</h2>
                    <p className="text-white/80 leading-relaxed">
                        We use your information to:
                    </p>
                    <ul className="list-disc list-inside text-white/80 ml-4 space-y-2">
                        <li>Provide, maintain, and improve our services.</li>
                        <li>Process your image generations and manage your profile.</li>
                        <li>Communicate with you about updates, features, and security alerts.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">4. Data Security</h2>
                    <p className="text-white/80 leading-relaxed">
                        We implement appropriate technical and organizational measures to protect your personal data against unauthorized access,
                        alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">5. Contact Us</h2>
                    <p className="text-white/80 leading-relaxed">
                        If you have any questions about this Privacy Policy, please contact us at:
                        <br />
                        <a href="mailto:vinaykumar7525@gmail.com" className="text-primary-tint hover:underline mt-2 inline-block">vinaykumar7525@gmail.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
