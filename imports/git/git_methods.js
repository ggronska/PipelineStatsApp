import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import getGitlab from '../git/git_lab';

// export const Papelines = new Mongo.Collection('papelines');
export const Pipelines = new Mongo.Collection('pipelines');

Meteor.methods({
    'updatePipeLines'(){
        const pipeLinePromise = getGitlab();
        pipeLinePromise.then((pipelinePromisePerProject) => {

            pipelinePromisePerProject.forEach((projectAndPipelinePromise) => {

                projectAndPipelinePromise.pipelines.then((pipelines) => {

                    let currentPipeline = Pipelines.findOne({"project.id": projectAndPipelinePromise.project.id, ref: projectAndPipelinePromise.ref }, {sort: {"id" : 1 }})
                    currentPipeline = currentPipeline ? currentPipeline : {id : -1}
                    pipelines.forEach( ( pipeline ) => {
                        if (currentPipeline.id <= pipeline.id) {
                            pipeline.project = {
                                id: projectAndPipelinePromise.project.id,
                                name: projectAndPipelinePromise.project.name,
                                web_url: projectAndPipelinePromise.project.web_url
                            }
                            Pipelines.upsert({"project.id": pipeline.project.id, "ref" : pipeline.ref }, pipeline)  
                        }
                    })
                })
            })
        })
    }
})   
