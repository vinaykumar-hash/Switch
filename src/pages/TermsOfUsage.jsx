import React from 'react';

const TermsOfUsage = () => {
    return (
        <div className="min-h-screen bg-black text-white font-fustat p-8 md:p-16">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl md:text-5xl font-bold font-fustat mb-8 text-primary-tint">Terms of Usage</h1>

                <p className="text-white/60">Last updated: {new Date().toLocaleDateString()}</p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
                    <p className="text-white/80 leading-relaxed">
                        By accessing and using <a href="https://switchstyle.app" className="text-primary-tint hover:underline">switchstyle.app</a> ("the Service"),
                        you agree to comply with and be bound by these Terms of Usage. If you do not agree, strictly do not use our Service.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">2. Use of Service</h2>
                    <p className="text-white/80 leading-relaxed">
                        You agree to use Switch only for lawful purposes. You are strictly prohibited from using the AI generation tools to create:
                    </p>
                    <ul className="list-disc list-inside text-white/80 ml-4 space-y-2">
                        <li>Illegal, harmful, or abusive content.</li>
                        <li>Content that infringes on intellectual property rights.</li>
                        <li>Non-consensual sexual content or deepfakes.</li>
                    </ul>
                    <p className="text-white/80 mt-2">
                        Violation of these terms may result in immediate termination of your account.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">3. Intellectual Property</h2>
                    <p className="text-white/80 leading-relaxed">
                        The Service and its original content, features, and functionality are owned by Switch and are protected by international copyright laws.
                        However, you retain ownership of the images you generate, subject to our usage license which grants us a non-exclusive right to host and display them for the purpose of providing the service.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">4. Limitation of Liability</h2>
                    <p className="text-white/80 leading-relaxed">
                        In no event shall Switch be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Service.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">5. Changes to Terms</h2>
                    <p className="text-white/80 leading-relaxed">
                        We reserve the right to modify these terms at any time. We will notify users of any significant changes via email or a notice on our website.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">6. Contact Information</h2>
                    <p className="text-white/80 leading-relaxed">
                        Questions about the Terms of Usage should be sent to us at:
                        <br />
                        <a href="mailto:vinaykumar7525@gmail.com" className="text-primary-tint hover:underline mt-2 inline-block">vinaykumar7525@gmail.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TermsOfUsage;
