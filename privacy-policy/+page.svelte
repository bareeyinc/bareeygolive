<script>
    import { onMount } from 'svelte';
    let activeSection = 'privacy-policy';
    let copiedText = '';

    onMount(() => {
        const path = window.location.pathname;
        if (path.includes('privacy')) {
            activeSection = 'privacy-policy';
        } else if (path.includes('terms')) {
            activeSection = 'terms';
        } else if (path.includes('refund')) {
            activeSection = 'refund-policy';
        } else if (path.includes('about')) {
            activeSection = 'about-bareey';
        } else if (path.includes('contact')) {
            activeSection = 'contact';
        }
    });

    function handleCopy(text, label) {
        navigator.clipboard.writeText(text);
        copiedText = label;
        setTimeout(() => {
            copiedText = '';
        }, 2000);
    }
</script>

<style>
    :global(html) {
        background-color: #FBFBFA;
        scroll-behavior: smooth;
    }
</style>

<div class="min-h-screen bg-[#FBFBFA] text-gray-900 font-sans relative overflow-x-hidden">
    <!-- Decorative Top Accent Glows -->
    <div class="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none z-0"></div>

    <!-- Header Panel -->
    <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-4">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-4">
                <a href="/" class="p-2 -ml-2 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-black rounded-xl transition-all flex items-center justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                </a>
                <div class="flex items-center gap-2">
                    <div class="w-7 h-7 bg-orange-600 text-white rounded-lg flex items-center justify-center font-extrabold text-sm shadow-sm">
                        B
                    </div>
                    <div>
                        <span class="font-black text-lg tracking-tight text-gray-950">bareey</span>
                        <span class="text-[10px] text-gray-400 font-bold block leading-none">LEGAL & POLICY CENTER</span>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">
                    <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    Google Play Compliant
                </span>
            </div>
        </div>
    </header>

    <!-- Main Content Area -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <!-- Left Sticky Sidebar Navigation -->
            <aside class="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
                <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                    <div>
                        <h3 class="text-xs font-black uppercase tracking-widest text-orange-600">Document Sections</h3>
                        <p class="text-[11px] text-gray-400 mt-0.5">Quickly jump to official terms and policy agreements</p>
                    </div>

                    <!-- Sidebar Navigation Links -->
                    <nav class="space-y-1">
                        <button on:click={() => activeSection = 'terms'} class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all border {activeSection === 'terms' ? 'bg-orange-600 text-white border-orange-600 shadow-sm' : 'bg-white text-gray-600 border-transparent hover:bg-gray-50 hover:text-black'}">
                            <span class="text-sm">📄</span>
                            <span>Terms of Use</span>
                        </button>
                        <button on:click={() => activeSection = 'privacy-policy'} class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all border {activeSection === 'privacy-policy' ? 'bg-orange-600 text-white border-orange-600 shadow-sm' : 'bg-white text-gray-600 border-transparent hover:bg-gray-50 hover:text-black'}">
                            <span class="text-sm">🛡️</span>
                            <span>Privacy Policy</span>
                        </button>
                        <button on:click={() => activeSection = 'refund-policy'} class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all border {activeSection === 'refund-policy' ? 'bg-orange-600 text-white border-orange-600 shadow-sm' : 'bg-white text-gray-600 border-transparent hover:bg-gray-50 hover:text-black'}">
                            <span class="text-sm">⚖️</span>
                            <span>Refund Policy</span>
                        </button>
                        <button on:click={() => activeSection = 'about-bareey'} class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all border {activeSection === 'about-bareey' ? 'bg-orange-600 text-white border-orange-600 shadow-sm' : 'bg-white text-gray-600 border-transparent hover:bg-gray-50 hover:text-black'}">
                            <span class="text-sm">ℹ️</span>
                            <span>About Bareey</span>
                        </button>
                        <button on:click={() => activeSection = 'contact'} class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all border {activeSection === 'contact' ? 'bg-orange-600 text-white border-orange-600 shadow-sm' : 'bg-white text-gray-600 border-transparent hover:bg-gray-50 hover:text-black'}">
                            <span class="text-sm">📞</span>
                            <span>Contact Details</span>
                        </button>
                    </nav>

                    <div class="pt-4 border-t border-gray-50 text-[11px] text-gray-400 space-y-2">
                        <div class="flex justify-between font-medium">
                            <span>Last Updated:</span>
                            <span class="text-gray-700 font-bold">June 30, 2026</span>
                        </div>
                        <div class="flex justify-between font-medium">
                            <span>Version:</span>
                            <span class="text-gray-700 font-bold">v2.4.1</span>
                        </div>
                    </div>
                </div>

                <!-- Quick Play Store Disclosure Alert Box -->
                <div class="bg-orange-50 border border-orange-100 p-5 rounded-2xl space-y-3">
                    <div class="flex items-start gap-3">
                        <span class="text-lg mt-0.5">🔒</span>
                        <div>
                            <h4 class="text-xs font-black text-gray-900 tracking-wide uppercase">Google User Data Policy</h4>
                            <p class="text-[11px] text-gray-600 leading-relaxed mt-1">
                                Bareey accesses only the basic profile scope (Email, Name, Picture) for verified Google OAuth sign-ins. Your sensitive files and private services are never accessed or shared.
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            <!-- Right Detailed Documentation Pane -->
            <main class="lg:col-span-8 space-y-12">
                {#if activeSection === 'terms'}
                    <!-- TERMS OF USE -->
                    <section class="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div class="flex items-center gap-3 pb-4 border-b border-gray-50">
                            <div class="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                                📄
                            </div>
                            <div>
                                <span class="text-[10px] font-black tracking-widest text-orange-600 uppercase">Section 1</span>
                                <h2 class="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">Terms of Use</h2>
                            </div>
                        </div>

                        <div class="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                            <p>
                                Bareey’s terms apply to all registered users and visitors on 
                                <strong class="text-gray-950 font-bold">bareey.com</strong>. Users are fully
                                responsible for their activities, which include creating posts and interacting with
                                others.
                            </p>
                            <p>
                                All users must respect regional laws and limitations as they are accountable for their
                                actions. Bareey monitors account activities to ensure safety and to protect user data from
                                threats.
                            </p>
                            <p>
                                We may collect certain confidential data like IP addresses and geolocation to improve the
                                platform experience and for advertiser targeting purposes.
                            </p>
                        </div>
                    </section>
                {:else}
                    {#if activeSection === 'privacy-policy'}
                        <!-- PRIVACY POLICY -->
                        <section class="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-8">
                            <div class="flex items-center gap-3 pb-4 border-b border-gray-50">
                                <div class="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                                    🛡️
                                </div>
                                <div>
                                    <span class="text-[10px] font-black tracking-widest text-orange-600 uppercase">Section 2</span>
                                    <h2 class="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">Privacy Policy</h2>
                                </div>
                            </div>

                            <p class="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                                Bareey is committed to protecting user confidentiality and safety. This policy details how we
                                access, collect, use, store, and share your personal data, especially data obtained through Google services.
                            </p>

                            <!-- subsection 1 -->
                            <div class="space-y-4">
                                <h3 class="text-sm sm:text-base font-extrabold text-gray-950 tracking-tight flex items-center gap-2">
                                    <span class="w-1.5 h-3 bg-orange-600 rounded-sm"></span>
                                    1. Data Collection and Usage Practices
                                </h3>
                                <p class="text-xs text-gray-500 font-semibold leading-relaxed">
                                    We collect and process the following categories of data for the purposes described:
                                </p>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-2">
                                        <span class="text-[10px] font-bold uppercase tracking-wider text-orange-600">Category A</span>
                                        <h4 class="text-xs font-black text-gray-900">Account & Profile Data</h4>
                                        <div class="text-[11px] text-gray-600 space-y-2 leading-relaxed">
                                            <p>
                                                <strong>Data Collected:</strong> Email, Username, Password (encrypted), and self-submitted profile information (e.g., bio, name).
                                            </p>
                                            <p>
                                                <strong>Usage:</strong> To create, maintain, and secure your Bareey account, enable platform interactions, and send essential service communications.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-2">
                                        <span class="text-[10px] font-bold uppercase tracking-wider text-orange-600">Category B</span>
                                        <h4 class="text-xs font-black text-gray-900">Usage & Device Data</h4>
                                        <div class="text-[11px] text-gray-600 space-y-2 leading-relaxed">
                                            <p>
                                                <strong>Data Collected:</strong> IP address, device type, browser information, and activity logs.
                                            </p>
                                            <p>
                                                <strong>Usage:</strong> To monitor platform stability, prevent fraudulent activity, protect against cyber threats, and optimize the overall user experience.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- subsection 2 -->
                            <div class="space-y-4 bg-orange-50/50 border border-orange-100 p-6 sm:p-8 rounded-2xl">
                                <div class="flex items-center gap-2">
                                    <span class="px-2 py-0.5 bg-orange-600 text-[9px] text-white font-black uppercase rounded-sm tracking-wide">OAuth Special</span>
                                    <h3 class="text-sm sm:text-base font-extrabold text-gray-950 tracking-tight">
                                        2. Handling of Google User Data
                                    </h3>
                                </div>
                                <p class="text-xs text-gray-600 leading-relaxed">
                                    When you choose to sign up or connect to Bareey using your Google Account, we access specific, limited information from Google solely to establish and manage your Bareey account.
                                </p>

                                <div class="space-y-4 pt-2">
                                    <div class="flex gap-3">
                                        <span class="text-emerald-600 text-sm mt-0.5">✔️</span>
                                        <div>
                                            <h4 class="text-xs font-extrabold text-gray-900">Data Accessed:</h4>
                                            <p class="text-[11px] text-gray-600 mt-1 leading-relaxed">
                                                We access only the <strong>Google basic profile information</strong> (Name, Email Address, and Profile Picture) via the Google Sign-in process. We <strong>do not</strong> access, request, or use any other sensitive Google services data, such as Google Drive, Contacts, Calendar, or any data outside of the basic profile scope.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="flex gap-3">
                                        <span class="text-emerald-600 text-sm mt-0.5">✔️</span>
                                        <div>
                                            <h4 class="text-xs font-extrabold text-gray-900">Data Usage:</h4>
                                            <p class="text-[11px] text-gray-600 mt-1 leading-relaxed">
                                                The Google Name and Email are used <strong>only</strong> for account authentication, login validation, and internal verification purposes. This data is <strong>not</strong> used to serve personalized advertisements or for any non-essential services.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="flex gap-3">
                                        <span class="text-emerald-600 text-sm mt-0.5">✔️</span>
                                        <div>
                                            <h4 class="text-xs font-extrabold text-gray-900">Data Sharing Limit:</h4>
                                            <p class="text-[11px] text-gray-600 mt-1 leading-relaxed">
                                                We <strong>do not share, sell, or rent Google user data</strong> (including your Google email and name) with any third-party advertisers, partners, or outside organizations. Your Google data remains confidential and is used solely by Bareey to provide the core services you signed up for.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- subsection 3 -->
                            <div class="space-y-4">
                                <h3 class="text-sm sm:text-base font-extrabold text-gray-950 tracking-tight flex items-center gap-2">
                                    <span class="w-1.5 h-3 bg-orange-600 rounded-sm"></span>
                                    3. Data Storage, Protection, Retention, and Deletion
                                </h3>
                                <p class="text-xs text-gray-500 font-semibold leading-relaxed">
                                    We prioritize user data security and apply strict policies for data management:
                                </p>

                                <div class="space-y-4">
                                    <div class="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                        <h4 class="text-xs font-black text-gray-950 uppercase tracking-wider mb-2">Storage & Protection</h4>
                                        <ul class="text-[11px] text-gray-600 space-y-2 list-disc pl-4 leading-relaxed font-medium">
                                            <li>All data is stored on secure, access-controlled, and encrypted servers.</li>
                                            <li>We use industry-standard security measures, including <strong>encryption (e.g., SSL/TLS)</strong>, to protect data both in transit and at rest.</li>
                                            <li>We proactively monitor activities and report threats related to cybercrime or any illegal activity to legal authorities.</li>
                                        </ul>
                                    </div>

                                    <div class="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                        <h4 class="text-xs font-black text-gray-950 uppercase tracking-wider mb-2">Data Retention & Deletion Rights</h4>
                                        <ul class="text-[11px] text-gray-600 space-y-2 list-disc pl-4 leading-relaxed font-medium">
                                            <li>We retain your account data for as long as your Bareey account remains active.</li>
                                            <li>You can delete your account and all associated data directly through your Account Settings.</li>
                                            <li>
                                                Alternatively, you may submit a formal request for data deletion by contacting our support team at 
                                                <button on:click={() => handleCopy('bareeyinc@gmail.com', 'email')} class="text-orange-600 font-bold hover:underline">
                                                    bareeyinc@gmail.com
                                                </button>
                                                . Upon verification, we will delete all personal data (including any associated Google data) within 
                                                <strong>30 days</strong>, unless retention is legally required.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    {:else}
                        {#if activeSection === 'refund-policy'}
                            <!-- REFUND POLICY -->
                            <section class="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                                <div class="flex items-center gap-3 pb-4 border-b border-gray-50">
                                    <div class="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                                        ⚖️
                                    </div>
                                    <div>
                                        <span class="text-[10px] font-black tracking-widest text-orange-600 uppercase">Section 3</span>
                                        <h2 class="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">Refund Policy</h2>
                                    </div>
                                </div>

                                <div class="space-y-4">
                                    <p class="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                                        Bareey values transparency and customer satisfaction. Refunds are processed only for
                                        transactions completed through our official Bareey platform or verified Bareey merchants.
                                    </p>

                                    <div class="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                        <ul class="text-[11px] sm:text-xs text-gray-600 space-y-3 list-disc pl-4 leading-relaxed font-medium">
                                            <li>Refund requests must be submitted within <strong>7 days</strong> of the transaction date.</li>
                                            <li>Approved refunds are credited back to the original payment method within <strong>5–10 business days</strong>.</li>
                                            <li>Refunds may not apply to digital or consumable content once accessed or used.</li>
                                            <li>
                                                To request a refund, please email us at 
                                                <button on:click={() => handleCopy('bareeyinc@gmail.com', 'email')} class="text-orange-600 font-bold hover:underline">
                                                    bareeyinc@gmail.com
                                                </button> 
                                                with your transaction details.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        {:else}
                            {#if activeSection === 'about-bareey'}
                                <!-- ABOUT BAREEY -->
                                <section class="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                                    <div class="flex items-center gap-3 pb-4 border-b border-gray-50">
                                        <div class="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                                            ℹ️
                                        </div>
                                        <div>
                                            <span class="text-[10px] font-black tracking-widest text-orange-600 uppercase">Section 4</span>
                                            <h2 class="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">About Bareey</h2>
                                        </div>
                                    </div>

                                    <div class="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                                        <p>
                                            Bareey is an all-in-one Entertainment, Business, and Messaging platform. It features a
                                            fast messaging system that enables users to interact, post, manage, buy, sell, and explore
                                            communities.
                                        </p>
                                        <p>
                                            Bareey bridges the gap between fun, business, and communication, making it a powerful and
                                            modern tool for everyone.
                                        </p>
                                    </div>
                                </section>
                            {:else}
                                <!-- CONTACT INFORMATION -->
                                <section class="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                                    <div class="flex items-center gap-3 pb-4 border-b border-gray-50">
                                        <div class="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                                            📞
                                        </div>
                                        <div>
                                            <span class="text-[10px] font-black tracking-widest text-orange-600 uppercase">Section 5</span>
                                            <h2 class="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">Contact Information</h2>
                                        </div>
                                    </div>

                                    <p class="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                                        For inquiries, support, or refund requests, please reach out to us through the following channels:
                                    </p>

                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <!-- Email Contact Card -->
                                        <button on:click={() => handleCopy('bareeyinc@gmail.com', 'email')} class="bg-gray-50 hover:bg-gray-100/75 border border-gray-100 p-5 rounded-2xl cursor-pointer transition-all space-y-2 text-center relative group w-full block">
                                            <div class="w-8 h-8 bg-white text-orange-600 rounded-lg flex items-center justify-center mx-auto shadow-sm border border-gray-100 text-xs">
                                                ✉️
                                            </div>
                                            <h4 class="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-1">Email Support</h4>
                                            <p class="text-xs font-bold text-gray-900 group-hover:text-orange-600 transition-colors break-all">
                                                bareeyinc@gmail.com
                                            </p>
                                            <span class="text-[10px] text-gray-400 font-medium block pt-1">
                                                📋 Click to Copy
                                            </span>
                                        </button>

                                        <!-- Phone Contact Card -->
                                        <button on:click={() => handleCopy('+2349021388401', 'phone')} class="bg-gray-50 hover:bg-gray-100/75 border border-gray-100 p-5 rounded-2xl cursor-pointer transition-all space-y-2 text-center relative group w-full block">
                                            <div class="w-8 h-8 bg-white text-orange-600 rounded-lg flex items-center justify-center mx-auto shadow-sm border border-gray-100 text-xs">
                                                📞
                                            </div>
                                            <h4 class="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-1">Direct Line</h4>
                                            <p class="text-xs font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                                                +234 9021388401
                                            </p>
                                            <span class="text-[10px] text-gray-400 font-medium block pt-1">
                                                📋 Click to Copy
                                            </span>
                                        </button>

                                        <!-- Address Card -->
                                        <div class="bg-gray-50 border border-gray-100 p-5 rounded-2xl space-y-2 text-center">
                                            <div class="w-8 h-8 bg-white text-orange-600 rounded-lg flex items-center justify-center mx-auto shadow-sm border border-gray-100 text-xs">
                                                📍
                                            </div>
                                            <h4 class="text-[11px] font-black text-gray-400 uppercase tracking-widest">Business Address</h4>
                                            <p class="text-xs font-bold text-gray-900 leading-snug">
                                                Hayin banki kawo Kaduna State, Nigeria
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            {/if}
                        {/if}
                    {/if}
                {/if}
            </main>
        </div>
    </div>

    <!-- Copy Alert Notification Bubble -->
    {#if copiedText}
        <div class="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold border border-neutral-800 animate-bounce">
            <span class="text-emerald-500">✔️</span>
            <span>Copied {copiedText === 'email' ? 'email' : 'phone number'} to clipboard!</span>
        </div>
    {/if}

    <!-- Small Legal Disclaimer Footer block -->
    <footer class="border-t border-gray-100 bg-white py-8 mt-16 text-center text-xs text-gray-400 relative z-10">
        <div class="max-w-7xl mx-auto px-4">
            <p>© {new Date().getFullYear()} Bareey Inc. Kaduna, Nigeria. Settle confidently.</p>
            <p class="mt-1 font-medium">
                Bareey Escrow Services are protected in accordance with federal p2p trading directives and regional regulations.
            </p>
        </div>
    </footer>
</div>
