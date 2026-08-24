import Razorpay from "razorpay";


let razorpay: Razorpay | null = null;


export function getRazorpay(){
    if(!razorpay){
        const keyId = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY?.trim();
        const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

        if (!keyId || !keySecret) {
            throw new Error("Razorpay API keys are not configured.");
        }

        razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
        })
    }

    return razorpay;
}