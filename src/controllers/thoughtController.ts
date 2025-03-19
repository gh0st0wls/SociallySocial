import { Request, Response } from "express";
import Thoughts from "../models/thoughtModel.js";
import User from "../models/userModels.js";

// get all thoughts
export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thoughts.find({}).select("-__v");
    
    if(thoughts.length === 0){
      res.status(404).json({message:"No thoughts found !!"});
      return;
    }
    res.status(200).json(thoughts);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// get single thougt
export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thoughts.findById(req.params.thoughtId);

    // if no thought found
    if (!thoughts) {
      res.status(404).json({ message: "thought not found" });
      return;
    }
    res.status(200).json(thoughts);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// create a thought
export const createThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thoughts.create(req.body);
    const user = await User.findByIdAndUpdate(
      req.body.userId,
      { $addToSet: { thoughts: thoughts._id } },
      { new: true }
    );

    // checking if user exists
    if (!user) {
      res.status(404).json({ message: "Anonymous thought created, no user specified" });
      return;
    }

    res.status(200).json(thoughts);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// update a thought
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thoughts.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );

    if(!thoughts){
      res.status(404).json({message:"No thoughts found"});
      return;
    }

    res.status(200).json(thoughts);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// delete a thought
//x todo update the user when a thought is deleted
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thoughts.findById(req.params.thoughtId);
    if(!thoughts){
        res.status(404).json({message:"Thought not found"});
        return;
    }
    // pulling the thought before deleting it
    await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new:true }
    )
    // deleting the thought
    await Thoughts.findByIdAndDelete( req.params.thoughtId )
    res.status(200).json({message:"Thought Deleted."});
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// reactions
// create a reaction
export const createReaction = async (req: Request, res: Response) => {
  try {
    const reaction = await Thoughts.findByIdAndUpdate(req.params.thoughtId, {
      $addToSet: { reactions: req.body },
    },{new:true});
    if(!reaction){
      res.status(404).json({message:"No thought found to react to !!"});
      return;
    }
    res.status(200).json(reaction);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// delete a reaction
export const deleteReaction = async (req:Request, res:Response) => {
    try {
        const reaction = await Thoughts.findByIdAndUpdate(req.params.thoughtId,{$unset:{reactions:""}});
        if(!reaction){
          res.status(404).json({message:"No Reactions found"});
          return;
        }
        res.status(200).json({message:"Reaction Deleted"});
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}
