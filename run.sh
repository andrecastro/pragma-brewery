trap 'docker-compose down -v' EXIT

build=0
debug_mode=0
check_rules=0
# idiomatic parameter and option handling in sh
while test $# -gt 0
do
    case "$1" in
        '--build' | '-b') build=1
            ;;
    esac
    shift
done

docker-compose down -v

if [[ ${build} -eq 1 ]]; then
  echo -e "Building images\n"
  docker-compose build
  result=$?
  [[ result -ne 0 ]] && echo -e "Error in docker-compose build [${result}]\n" && exit ${result}
  docker-compose up --abort-on-container-exit --force-recreate
else
  docker-compose up --abort-on-container-exit --force-recreate
fi
