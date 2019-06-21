composer archive create -t dir -n .
composer network install -a permit-cycle@$1.bna -c PeerAdmin@hlfv1
composer network upgrade -c PeerAdmin@hlfv1 -n permit-cycle -V $1


