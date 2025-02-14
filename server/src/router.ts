import express from "express";
import authActions from "./modules/auth/authActions";
import favoriteActions from "./modules/favorite/favoriteActions";
import itemActions from "./modules/item/itemActions";
import tokenActions from "./modules/token/tokenActions";
import userActions from "./modules/user/userActions";

const router = express.Router();

/* ************************************************************************* */

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users", authActions.hashPassword, userActions.add);
router.put("/api/users/:id", userActions.edit);
router.delete("/api/users/:id", userActions.destroy);

router.get("/api/tokens", tokenActions.browse);
router.get("/api/tokens/:id", tokenActions.read);
router.get("/api/tokens/name/:name", tokenActions.readByName);
router.post("/api/tokens", tokenActions.add);
router.delete("/api/tokens/:id", tokenActions.destroy);

router.get("/api/favorites/:id", favoriteActions.read);
router.post("/api/favorites", favoriteActions.add);
router.delete("/api/favorites", favoriteActions.destroy);

router.get("/api/verify-email", userActions.verifyEmail);

router.post("/api/login", authActions.login);

/* ************************************************************************* */

// Define item-related routes

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

export default router;
