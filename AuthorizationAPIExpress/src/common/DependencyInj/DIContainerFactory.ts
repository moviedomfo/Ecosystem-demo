import container from "./Container";
import containerTest from "./ContainerTest";

export const CreateContainer = () => {
  if (process.env.NODE_ENV === "test") return containerTest;
  if (process.env.NODE_ENV === "development") return container;
};