<script>
    import { onMount } from 'svelte';
    let confirmDelete = false;
    let loading = false;
    let username = '';
    let password = '';
    let message = '';
    let messageType = ''; // 'success' or 'error'

    onMount(() => {
        document.documentElement.style.scrollBehavior = "smooth";
    });

    async function handleDeleteRequest(event) {
        event.preventDefault();

        if (!username.trim() || !password.trim()) {
            message = "Please fill in both username and password.";
            messageType = 'error';
            return;
        }

        loading = true;
        message = '';

        try {
            const res = await fetch("https://bareeyapiendpoint.azurewebsites.net/removeaccount/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username.trim(), password: password.trim() })
            });

            const data = await res.json();
            if (data.success) {
                message = "Your account has been scheduled for deletion successfully.";
                messageType = 'success';
                username = '';
                password = '';
                confirmDelete = false;
            } else {
                message = data.message || "Invalid username or password.";
                messageType = 'error';
            }
        } catch {
            message = "An error occurred. Please try again later.";
            messageType = 'error';
        } finally {
            loading = false;
        }
    }
</script>

<style>
    :global(html) {
        background-color: #FBFBFA;
    }

    .bareey-delete-outer {
        min-h: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
        position: relative;
        overflow: hidden;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    /* Red/Amber Top Glow Effect */
    .bareey-delete-outer::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 400px;
        background: linear-gradient(180deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0) 100%);
        pointer-events: none;
        z-index: 0;
    }

    .bareey-delete-container {
        max-width: 680px;
        width: 100%;
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 1.5rem;
        padding: 2.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01);
        position: relative;
        z-index: 10;
        box-sizing: border-box;
    }

    .bareey-brand-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 2rem;
    }

    .bareey-brand-icon {
        width: 3.5rem;
        height: 3.5rem;
        background: #fee2e2;
        color: #dc2626;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        font-size: 1.75rem;
        border: 1px solid rgba(220, 38, 38, 0.1);
    }

    .bareey-delete-title {
        font-size: 1.75rem;
        font-weight: 850;
        color: #030712;
        letter-spacing: -0.03em;
        margin: 0;
    }

    .bareey-delete-subtitle {
        font-size: 0.875rem;
        color: #6b7280;
        margin-top: 0.25rem;
    }

    /* Testing Alert Card styling */
    .bareey-alert-box {
        background: #fffdf5;
        border: 1px solid #fef3c7;
        padding: 1.5rem;
        border-radius: 1rem;
        text-align: left;
        margin-bottom: 2rem;
    }

    .bareey-alert-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.75rem;
        font-weight: 900;
        color: #b45309;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.5rem;
    }

    .bareey-delete-message {
        font-size: 0.8125rem;
        color: #78350f;
        line-height: 1.6;
        margin: 0;
    }

    .bareey-date-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(217, 119, 6, 0.15);
    }

    .bareey-date-label {
        font-size: 0.75rem;
        font-weight: 700;
        color: #78350f;
    }

    .bareey-delete-date {
        display: inline-block;
        background: #fef3c7;
        color: #78350f;
        padding: 0.375rem 1rem;
        border-radius: 0.5rem;
        font-weight: 900;
        font-size: 0.75rem;
        border: 1px solid #fde68a;
        text-transform: uppercase;
        letter-spacing: 0.02em;
    }

    /* Form styling */
    .bareey-delete-form {
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
    }

    .bareey-delete-form label {
        font-weight: 700;
        font-size: 0.75rem;
        color: #374151;
        text-transform: uppercase;
        letter-spacing: 0.03em;
    }

    .bareey-delete-form input[type="text"],
    .bareey-delete-form input[type="password"] {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.75rem;
        font-size: 0.875rem;
        background-color: #f9fafb;
        color: #111827;
        box-sizing: border-box;
        transition: all 0.15s ease-in-out;
    }

    .bareey-delete-form input[type="text"]:focus,
    .bareey-delete-form input[type="password"]:focus {
        border-color: #ef4444;
        background-color: #ffffff;
        outline: none;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .bareey-confirm {
        margin: 0.5rem 0;
        display: flex;
        align-items: start;
        gap: 0.75rem;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        padding: 1rem;
        border-radius: 0.75rem;
    }

    .bareey-confirm input[type="checkbox"] {
        width: 1.125rem;
        height: 1.125rem;
        accent-color: #ef4444;
        cursor: pointer;
        margin-top: 0.125rem;
    }

    .bareey-confirm label {
        font-weight: 600;
        font-size: 0.75rem;
        color: #4b5563;
        line-height: 1.5;
        cursor: pointer;
        text-transform: none;
        letter-spacing: normal;
    }

    /* Notification message */
    .bareey-notification {
        padding: 1rem;
        border-radius: 0.75rem;
        font-size: 0.8125rem;
        font-weight: 600;
        line-height: 1.5;
        border: 1px solid;
    }

    .bareey-notification.success {
        background-color: #ecfdf5;
        border-color: #a7f3d0;
        color: #065f46;
    }

    .bareey-notification.error {
        background-color: #fef2f2;
        border-color: #fca5a5;
        color: #991b1b;
    }

    /* Button and spinner */
    .submit-container {
        display: flex;
        justify-content: flex-start;
    }

    .bareey-delete-form button {
        background: #dc2626;
        color: #ffffff;
        padding: 0.75rem 1.75rem;
        font-size: 0.8125rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border: none;
        border-radius: 0.75rem;
        cursor: pointer;
        transition: all 0.15s ease-in-out;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }

    .bareey-delete-form button:hover {
        background: #b91c1c;
    }

    .bareey-delete-form button:disabled {
        background: #9ca3af;
        cursor: not-allowed;
    }

    .loader {
        border: 2px solid #f3f3f3;
        border-top: 2px solid #ffffff;
        border-radius: 50%;
        width: 1rem;
        height: 1rem;
        animation: spin 0.8s linear infinite;
        display: inline-block;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* Small Footer Disclaimer block */
    .bareey-footer {
        margin-top: 3rem;
        text-align: center;
        font-size: 0.75rem;
        color: #9ca3af;
        line-height: 1.5;
        max-width: 400px;
    }

    @media (max-width: 600px) {
        .bareey-delete-container {
            padding: 1.5rem;
            border-radius: 1rem;
        }
        .bareey-delete-title {
            font-size: 1.375rem;
        }
    }
</style>

<div class="bareey-delete-outer">
    <div class="bareey-delete-container">
        <div class="bareey-brand-header">
            <div class="bareey-brand-icon">B</div>
            <h1 class="bareey-delete-title">Account Deletion</h1>
            <span class="bareey-delete-subtitle">Secure removal request portal</span>
        </div>

        <div class="bareey-alert-box">
            <div class="bareey-alert-header">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.25rem;"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                Limited Testing Phase Disclosure
            </div>
            <p class="bareey-delete-message">
                We are currently in a limited testing phase with family and close friends to ensure all features in Bareey work smoothly and securely before launching to the public. We are ensuring that user data removal works flawlessly before public release.
            </p>
            <div class="bareey-date-row">
                <span class="bareey-date-label">Fully integrated in-app feature launch:</span>
                <span class="bareey-delete-date">25th August 2025</span>
            </div>
            <p class="bareey-delete-message" style="margin-top: 1rem;">
                By this date, Bareey will be opened to hundreds of users, and the account deletion option will be fully integrated within the app’s settings. Until then, you can request account deletion below via this temporary form.
            </p>
        </div>

        {#if message}
            <div class="bareey-notification {messageType}" style="margin-bottom: 1.5rem;">
                {message}
            </div>
        {/if}

        <form class="bareey-delete-form" on:submit={handleDeleteRequest}>
            <div class="form-group">
                <label for="username">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    bind:value={username} 
                    placeholder="Enter your username" 
                    required 
                    disabled={loading}
                >
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    bind:value={password} 
                    placeholder="Enter your password" 
                    required 
                    disabled={loading}
                >
            </div>

            <div class="bareey-confirm">
                <input type="checkbox" id="confirmDelete" bind:checked={confirmDelete} disabled={loading}>
                <label for="confirmDelete">
                    I understand that submitting this request will schedule my Bareey account, linked wallet details, active escrow metadata, and saved profile credentials for irreversible permanent deletion.
                </label>
            </div>

            {#if confirmDelete}
                <div class="submit-container">
                    <button type="submit" disabled={loading}>
                        {#if loading}
                            <span>Deleting...</span>
                            <span class="loader"></span>
                        {:else}
                            <span>Request Deletion</span>
                        {/if}
                    </button>
                </div>
            {/if}
        </form>
    </div>

    <div class="bareey-footer">
        <p>© {new Date().getFullYear()} Bareey Inc. Kaduna, Nigeria. Settle confidently.</p>
        <p style="margin-top: 0.25rem;">
            Data erasure pipeline is compliant with regional and global user protection mandates.
        </p>
    </div>
</div>
