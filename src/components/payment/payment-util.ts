  export const paymentIntent = async <T>(
    url: string,
    amount: number
  )
  : Promise<string> => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: amount
      })
    });

    const { clientSecret } = await res.json();
    return await clientSecret;
  }