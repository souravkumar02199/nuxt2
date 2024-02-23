export default async ({ app }) => {
  if (process.client) {
    // This code will only execute on the client side
    const { $gtm } = app;
    $gtm.init('GTM-MR3XTCWQ'); // Initialize GTM with your GTM ID
  }
};