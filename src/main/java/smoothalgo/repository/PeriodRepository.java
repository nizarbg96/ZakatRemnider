package smoothalgo.repository;

import smoothalgo.domain.Period;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Period entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PeriodRepository extends JpaRepository<Period, Long> {

}
