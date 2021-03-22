import "./ImgExplore.css"

export default function ImgExplore({src, alt}) {
    return (
        <img alt={alt} src={src} width="292" height="292" className="ImgExplore"/>
    );
}