import mongoose from "mongoose";

async function runInTransaction(mutations) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const value = await mutations(session);

    // Since the mutations ran without an error, commit the transaction.
    await session.commitTransaction();

    // Return any value returned by `mutations` to make this function as transparent as possible.
    return value;
  } catch (error) {
    // Abort the transaction as an error has occurred in the mutations above.
    await session.abortTransaction();

    // Rethrow the error to be caught by the caller.
    throw error;
  } finally {
    // End the previous session.
    session.endSession();
  }
}

export { runInTransaction };
