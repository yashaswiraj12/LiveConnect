// inngest.js
import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { User } from "../models/user.model.js";
import { deleteStreamUser,upsertStreamUser,addUserToPublicChannels} from "./stream.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "live-connect" });

/**
 * Sync user to MongoDB when Clerk user is created
 */
const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    try {
      await connectDB();

      const { id, email_addresses, first_name, last_name, image_url } =
        event.data;

      const newUser = {
        clerkId: id,
        email: email_addresses?.[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        image: image_url,
      };

      await step.run("save-user", async () => {
        return await User.create(newUser);
      });
      await upsertStreamUser({
        id: newUser.clerkId.toString(),
        name: newUser.name,
        image: newUser.image,
      });

      await addUserToPublicChannels(newUser.clerkId.toString());

      console.log("✅ User synced:", newUser.email);
      return { success: true };
    } catch (error) {
      console.error("❌ Error syncing user:", error.message);
      return { success: false, error: error.message };
    }
  }
);


const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {
    try {
      await connectDB();

      const { id } = event.data;

      await step.run("delete-user", async () => {
        return await User.deleteOne({ clerkId: id });
      });
      await deleteStreamUser(id.toString());

      console.log("🗑️ User deleted:", id);
      return { success: true };
    } catch (error) {
      console.error("❌ Error deleting user:", error.message);
      return { success: false, error: error.message };
    }
  }
);

// Export all functions
export const functions = [syncUser, deleteUserFromDB];
