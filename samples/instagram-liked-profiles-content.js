/**
 * Streams yet unliked medias on Instagram from all followed profiles and optionally from profiles followed by those users
 */

dc.plugin("dc-instagram", {client_id: "CLIENT_ID", client_secret: "CLIENT_SECRET"})
    .init()
        // the following command will act on every request
        .readData(dc.http.handlePath("/instagramFollow"))
            .every(
                (requestData) => {
                    const accumulator = dc.createAccumulator();
                    return dc.instagram.instagramHandleAuthorization(requestData)
                        // TODO: how do we handle a thread that's needed where I put "HERE!"
                        .thread(
                            "LIKES",
                            (authorizedInstagram) => {
                                return authorizedInstagram.instagramMediaLiked(dc.instagram.UserSelf, {count: requestData.getInteger("likes_count", 1000)})
                                    .accumulate()
                                    .then(
                                        (likes) => accumulator.likes = likes
                                    );
                            }
                        )
                        .instagramUserFollows(dc.instagram.UserSelf)
                            .reduce(
                                (emitter, instagramUser) => {
                                    dc.instagram.instagramRecentUserMedia(instagramUser, {count: requestData.getInteger("user_media_count", 20)})
                                        .map(
                                            (instagramMedia) => emitter.emit(instagramMedia)
                                        );
                                },
                                dc.dataEmitter()
                            )
                            // TODO: HERE!
                            .wait("LIKES")
                            .filter(
                                (instagramMedia) => !(instagramMedia.id in accumulator.likes)
                            )
                            .accumulate()
                            .then(
                                (instagramMedia) => requestData.send(instagramMedia)
                            );
                }
            )
;
