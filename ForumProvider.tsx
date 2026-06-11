// forum state, same context + useReducer pattern as the recipe app we did in class
// originally i had useState inside discover but posts show on two screens
// and each screen had its own copy so new posts only appeared in one place. annoying
// context lifts the state above both screens so they read the same list

import { createContext, useContext, useReducer } from "react";
import { FORUM_POSTS } from "@/data/mockData";

const ForumContext = createContext<any>(null);
const ForumDispatchContext = createContext<any>(null);

// reducer takes the current posts plus an action and returns a new list
// never edit state directly, always return a new array (learned this the hard way)
function forumReducer(posts: any[], action: any) {
  switch (action.type) {
    case "add":
      // newest post goes on top like a real forum
      return [{ id: Date.now().toString(), ...action.data }, ...posts];
    default:
      return posts;
  }
}

export function ForumProvider({ children }: { children: React.ReactNode }) {
  const [posts, dispatch] = useReducer(forumReducer, FORUM_POSTS);

  return (
    <ForumContext.Provider value={posts}>
      <ForumDispatchContext.Provider value={dispatch}>
        {children}
      </ForumDispatchContext.Provider>
    </ForumContext.Provider>
  );
}

export function useForum() {
  return useContext(ForumContext);
}

export function useForumDispatch() {
  return useContext(ForumDispatchContext);
}
