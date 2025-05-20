import { NextFunction, Request, Response } from "express";
import { GET, route } from "awilix-express";
import KafkaAdminRepository from "@infra/repos/KafkaAdmin.repo";
import { GetTopicInfoReq } from "@domain/DTOs/KafkaSvc";

/**
 * A purchase order is issued by the buyer generator (¡random cron-job app) and and later is to be fulfilled by the vendor
 */
@route("/api/kafka")
export default class KafkaController {
  constructor(private readonly kafkaRepo: KafkaAdminRepository) { }
  @route("/GetTopicInfo")
  @GET()
  public GetTopicInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqBody: GetTopicInfoReq = req.body as GetTopicInfoReq;

      const result = await this.kafkaRepo.GetTopicInfo(reqBody.Topic);
      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      console.log("err  " + JSON.stringify(e));
      next(e);
    }
  };

 @route("/GetAllTopics")
  @GET()
  public GetAllTopics = async (_req: Request, res: Response, next: NextFunction) => {
    try {

      const result = await this.kafkaRepo.GetAllTopics();
      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      console.log("err  " + JSON.stringify(e));
      next(e);
    }
  };
}
