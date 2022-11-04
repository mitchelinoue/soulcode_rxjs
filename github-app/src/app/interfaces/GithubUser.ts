export interface GithubUser{ //serve para representar os dados da API retorna
    login: string
    avatar_url:string
    followers: number
    following: number
    name: string
    blog: string
    location: string
    email: string
    bio: string
    public_repos: string
    html_url: string
  }

export interface GithubUserRepo {
  id: number
  name: string
  language: string
}
