// ES6 (>=node 8.0.0)
import { ProjectsBundle } from 'gitlab'




const getGitlab = function () {
  const services = new ProjectsBundle({
    token: '_mECRu2B5SByyBysVhve'	// Can be created in your profile.
   
})
  return services.Projects.all({membership:true, simple:true}).then((projects) => {
    return projects.map((project) => {
      return {project, pipelines: services.Pipelines.all(project.id,{"sort":"desc"})}
    })
  }).catch(error => console.log(error))
}

export default getGitlab