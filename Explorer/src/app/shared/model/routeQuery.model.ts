import { Keypoint } from "src/app/feature-modules/tour-authoring/model/keypoint.model";
import { TransportType } from "src/app/feature-modules/tour-authoring/model/tour.model";

export interface RouteQuery{
    keypoints: Keypoint[];
    transportType: TransportType;
}