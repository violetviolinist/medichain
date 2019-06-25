composer archive create -t dir -n .
composer network install -a medichain@$1.bna -c PeerAdmin@hlfv1
composer network upgrade -c PeerAdmin@hlfv1 -n medichain -V $1


