<script lang="ts">
    import { enhance } from '$app/forms';

    import { onMount } from 'svelte';

    let isShownReward = false;


    const handleFormData = async (formData:any, cancel:any) => {

        const firstName = formData.get('first-name');
        const lastName = formData.get('last-name');
        const email = formData.get('email');
        const company = formData.get('company');


        let inputArrayNotCheckBox = Array.from(
            document.querySelectorAll('input:not([type="checkbox"])')
        );
        let inputCheckBox = document.querySelector('input[type="checkbox"]');
        const isEmailValid = inputArrayNotCheckBox.some(
            (input) =>
                input.type === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())
        );

        let filledInputsNotCheckBox = inputArrayNotCheckBox.filter(
            (input) => input.value.trim() !== ''
        );
        const validation = {
            success: filledInputsNotCheckBox.length === 4 && isEmailValid && inputCheckBox.checked
        };
        // if (validation.success) {
            inputArrayNotCheckBox.forEach((e) => (e.disabled = true));
            inputArrayNotCheckBox.forEach((e) => (e.style.backgroundColor = 'gray'));
            inputArrayNotCheckBox.forEach((e) => (e.value = ''));
            inputArrayNotCheckBox.forEach((e) => (e.placeholder = ''));
            inputCheckBox.checked = false;
            inputCheckBox.disabled = true;
            document.querySelector('button[type="submit"]').style.background = 'gray';
            document.querySelector('form').style.clipPath  = 'circle(0% at 50% 50%)';
            cancel();
            // isShownReward = true
        // }

        const data = {
            firstName,
            lastName,
            email,
            company
        };

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });


        if (response.ok) {
            console.log('Success');
        }


    };
    onMount(() => {
        document.body.addEventListener('reward', (event) => {
            console.log('reward', event);
            if (event?.detail) {
                rewardAmount = event.detail.reward;
                balance = event.detail.balance;
                isShownReward = true;
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'auto'
                });
                document.body.style.overflow = 'hidden';
            }
        });
    });

    $: if (!isShownReward) {
        if (typeof document !== 'undefined') {
            document.body.style.overflowY = 'scroll';
        }
    }
</script>


<div class="flex flex-col items-center w-full md:bg-[#111126]">
    <div
        class="flex flex-col items-center max-w-[1072px] w-[1072px] pt-[75px] pb-[27px] sm:pb-[50px] md:w-full sm:w-full"
    >
        <div class="subtitle-3 ml-[46px] md:ml-0">Your Questions Answered</div>
        <h2 class="title-2 ml-[46px] md:ml-0">Book a Demo</h2>

        <div class="form-container pt-[10px]">
            <form
                class="demo-form"
                autocomplete="off"
                use:enhance={async ({ formData, cancel }) => {
                    console.log(formData,'formData',cancel,'cancel')
                    await handleFormData(formData, cancel);
                    console.log('form submitted');
                    return ({ result, update }) => {
                        console.log(result)
                        cancel();
                    };
                }}
                method="POST"
            >
                <div class="form-row">
                    <div class="form-group">
                        <label class="body-1" for="first-name">First Name</label>
                        <input required type="text" id="first-name" name="first-name" autocomplete="given-name" />
                    </div>
                    <div class="form-group">
                        <label class="body-1" for="last-name">Last Name</label>
                        <input required type="text" id="last-name" name="last-name" autocomplete="family-name" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="body-1" for="email">Email</label>
                        <input required type="email" id="email" name="email" autocomplete="email" />
                    </div>
                    <div class="form-group">
                        <label class="body-1" for="company">Company</label>
                        <input required type="text" id="company" name="company" autocomplete="organization" />
                    </div>
                </div>
                <div class="flex flex-row mb-[12px] justify-between w-full body-2 md:flex-col">
                    <div class="pt-[30px] terms ml-[-10px] dm:pt-0 sm:pt-0">
                        <input
                            id="terms"
                            required
                            name="terms"
                            type="checkbox"
                            oninvalid="this.setCustomValidity('Please check this input')"
                            onchange="this.setCustomValidity('')"
                        />
                        <label for="terms"
                            >I agree to <span class="text-[#E4E7F2]">Terms and Conditions</span>
                        </label>
                    </div>
                    <div class="md:pl-[13px]">
                        <button type="submit" class="submit-button body-2">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    .form-container {
        text-align: left;
        width: 1072px;
    }
    form {
        clip-path: circle(100% at 50% 50%);
        transition: clip-path 1s 3s ease-in-out;
    }
    form .sent {
        clip-path: circle(0% at 50% 50%);
    }

    .demo-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 15px;
        gap: 13px;
    }

    .form-row {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 60px;
    }

    .form-group {
        flex: 1;
        margin: 10px;
        display: flex;
        flex-direction: column;
    }

    label {
        margin-bottom: 10px;
    }

    input {
        padding: 12px;
        border-radius: 10px;
        border: none;
        background-color: #1c1c43;
        color: #6c6f85;
        font-weight: 400;
    }

    input::placeholder {
        color: #6c6f85;
    }

    input:focus {
        outline: 2px solid #846bf3;
        background-color: #1f1f41;
    }

    .terms input {
        margin-right: 10px;
    }

    .submit-button {
        background-image: linear-gradient(90deg, #4e45ff 0%, #624aff 100%);

        border-radius: 8px;

        background-size: 100%;
        background-position: 0 0;
        border: none;
        padding: 10px 70px;

        cursor: pointer;
        margin: 15px 10px 0 0;
        color: #fbf9ff;
        font-weight: 600;
        transition: background-position 0.5s ease;
    }

    .submit-button:hover {
        background: linear-gradient(90deg, #6259ff 0%, #7f6bff 100%);
    }
    .submit-button:focus {
        background: linear-gradient(90deg, #3932ba 0%, #422fb8 100%);
    }

    .terms {
        margin-top: 4px;
        display: flex;
        align-items: center;
        color: #a1a5b2;
    }

    .terms input[type='checkbox'] {
        opacity: 0;
        position: relative;
        left: 30px;
    }

    .terms label {
        position: relative;
        cursor: pointer;
        padding-left: 42px;
        line-height: 30px;
    }

    .terms label::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 30px;
        height: 30px;
        border: 2px solid #282242;
        border-radius: 8px;
        background-color: #0f0c1b;
        transition:
            background-color 0.2s ease-in-out,
            border-color 0.2s ease-in-out;
    }

    .terms input[type='checkbox']:disabled + label::before {
        background-color: gray;
    }

    .terms input[type='checkbox']:checked + label::before {
        /*background-color: #4b3efd;*/
        /*border-color: #4b3efd;*/
    }

    .terms label::after {
        content: '';
        position: absolute;
        left: 4px;
        top: 4px;
        width: 22px;
        height: 22px;
        background-color: #5858f6;
        border-radius: 6px;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
    }

    .terms input[type='checkbox']:checked + label::after {
        opacity: 1;
    }

    @media (max-width: 1072px) {
        .form-container {
            width: auto;
            min-width: 80%;

        }
        .form-row {
            flex-direction: column;
            gap: 10px;
        }
    }
    @media (max-width: 600px) {
        .form-container {
            width: 96%;
            padding: 20px;

        }
        input {
            padding: 5px 15px;
        }
        .form-group{
            margin: 4px;
        }
        label{
            margin-bottom: 5px;
        }
    }
</style>
