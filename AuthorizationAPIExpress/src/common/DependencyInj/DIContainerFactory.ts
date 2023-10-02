import container from "./Container";
import containerTest from "./ContainerTest";

/**
 * This is important functiont that resoles DI Container depending on enviropment
 * Some of the  services and repositories for test purposes will be diferents
 * regarding pord and development.-
 * @returns DI Container depending env.NODE_ENV
 */
export const CreateContainer = () => {
  const env = process.env.NODE_ENV;
  return env === "test" ? containerTest : container;
};
